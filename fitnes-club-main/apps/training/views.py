from rest_framework import generics
from apps.services.models import Schedule, Service
from apps.training.serializers import JoinTrainingSerializer, AbonomentAplicationSerializer, JoinTrainingSerializer, PartipicantJoinTrainingSerializer, UserJoinSerializer
from apps.training.models import AbonomentAplication, JoinTraining, UserJoinTraining
from apps.accounts.permissions import IsOwnUserOrReadOnly
from rest_framework import permissions
# from apps.training.filters import ParticipantTrainingFilter
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from core.settings.base import EMAIL_HOST_USER
from rest_framework.response import Response
from datetime import datetime, timedelta


class ParticipantTrainingCreate(generics.CreateAPIView):
    queryset = JoinTraining.objects.all()
    serializer_class = PartipicantJoinTrainingSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def create(self, request, *args, **kwargs):
        data = request.data
        service_type = data.get('service')
        date = data.get('date')
        print(data)
        if service_type is None or date is None:
            return Response(status=400)

        service = Service.objects.get(service_type=service_type.upper())
        datetime_ = datetime.strptime(date,'%Y-%m-%dT%H:%M')
        print(datetime_,datetime_.time())
        date = datetime_.date()
        end_datetime = datetime_ + timedelta(hours=1)
        print(datetime_,end_datetime)
        if not UserJoinTraining.objects.filter(date=date, start_time__range=[datetime_.time(),end_datetime.time()], service=service).exists():
            UserJoinTraining.objects.create(
                date=date,
                user=request.user,
                start_time=datetime_.time(),
                end_time=end_datetime.time(),
                service=service
            )
            self.send_confirmation_email(service.get_service_type_display())
            return Response({'message':"Created"},status=201)  
        else:
            return Response({'message':'trainer is bussy'},status=409)  

    def send_confirmation_email(self, service_type):
        subject = 'Запись на тренировку'
        message = f'Спасибо, что записались к на тренировку {service_type}, в скором времени мы вам позвоним и уточним детали'
        from_email = EMAIL_HOST_USER
        to_list = [self.request.user.email]
        send_mail(subject, message, from_email, to_list, fail_silently=True)


class UserParticipantTrainingList(generics.ListAPIView):
    serializer_class = JoinTrainingSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnUserOrReadOnly)
    # filterset_class = ParticipantTrainingFilter
    filter_backends = [DjangoFilterBackend,
                       SearchFilter, OrderingFilter]
    pagination_class = None

    def get_queryset(self):
        return JoinTraining.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        # current_time  = datetime.now()
        personal = UserJoinTraining.objects.filter(user = request.user)
        group = JoinTraining.objects.filter(user=self.request.user)
        data = {
            'personal':UserJoinSerializer(personal,many=True).data,
            'group': JoinTrainingSerializer(group,many=True).data
        }
        return Response(data)


class AbonomentAplicationCreate(generics.CreateAPIView):
    queryset = AbonomentAplication.objects.all()
    serializer_class = AbonomentAplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        self.send_confirmation_email(instance)

    def send_confirmation_email(self, instance):
        subject = 'Заявка на абонемент'
        message = f'Спасибо, что оставили заявку на абонемент {instance.type}, в скором времени мы вам позвоним и уточним детали'
        from_email = EMAIL_HOST_USER
        to_list = [self.request.user.email]
        send_mail(subject, message, from_email, to_list, fail_silently=True)


class JoinTrainingCreate(generics.CreateAPIView):
    queryset = JoinTraining.objects.all()
    serializer_class = JoinTrainingSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        print(data)
        data['user'] = user.id
        data['name'] = user.first_name
        data['phone'] = f"{user.phone_number}"
        data['email'] = user.email
        sz = JoinTrainingSerializer(data=data, context={'r': request.user})
        sz.is_valid(raise_exception=True)
        sz.save()
        sz_data = sz.data
        self.send_confirmation_email(
            sz_data['service_title'], sz_data['email'])
        return Response(sz_data, status=201)

    def send_confirmation_email(self, service, email):
        subject = 'Запись на тренировку'
        message = f'Спасибо, что записались к на тренировку {service}, в скором времени мы вам позвоним и уточним детали'
        from_email = EMAIL_HOST_USER
        to_list = [email]
        send_mail(subject, message, from_email, to_list, fail_silently=True)

#
