import os
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from django.urls import reverse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import generics, status, views, permissions
from apps.accounts.models import User
from apps.accounts.serializers import PasswordUpdateSerializer, RegisterSerializer, SetNewPasswordSerializer, \
    ResetPasswordEmailRequestSerializer, LoginSerializer, \
    LogoutSerializer, UserListSerializer, UserUpdateEmailSerializer, ProfileSerializer
from dj_rest_auth.views import LoginView as RestLoginView
from django.core.mail import send_mail
from core.settings.base import EMAIL_HOST_USER
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import QueryDict


class AccountRegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response({"success": True, "data": user_data}, status=status.HTTP_201_CREATED)


class LoginAPIView(RestLoginView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed({"success": False, "message": "Неверный логин или пароль"})

        # Создаем JWT-токены для пользователя
        refresh = RefreshToken.for_user(user)

        return Response({'refresh': str(refresh), 'access': str(refresh.access_token),
                         'id': user.pk, 'email': user.email,
                         'first_name': user.first_name, 'image_url': user.image_url, 'code': user.code,
                         'is_active': user.is_active, 'data_activate': user.data_activate,
                         'data_expired': user.data_expired},
                        status=status.HTTP_200_OK)


class UpdatePassword(generics.UpdateAPIView):
    serializer_class = PasswordUpdateSerializer
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        user = request.user
        sz = PasswordUpdateSerializer(data=request.data, context={'user': user}, many=False)
        sz.is_valid(raise_exception=True)
        password = request.data.get('password')
        user.set_password(password)
        user.save()
        return Response({'status': True})


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data.get('email', '')
        partner = get_object_or_404(User, email=email)
        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        current_site = get_current_site(
            request=request).domain
        relativeLink = reverse(
            'user:password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        absurl = 'http://' + current_site + relativeLink
        email_body = f'Привет! Используйте ссылку ниже, чтобы сбросить пароль: {absurl}'
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Сбросить пароль'}
        send_mail(
            'Сбросить пароль',
            email_body,
            EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        return Response({'success': 'Мы отправили вам ссылку для сброса пароля'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        id = smart_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=id)
        redirect_url = "http://localhost:3000/changepassword"

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return HttpResponseRedirect('http://localhost:3000/404' + '?token_valid=False')
                else:
                    return HttpResponseRedirect(os.environ.get('FRONTEND_URL', '') + '?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return HttpResponseRedirect(
                    redirect_url + '?token_valid=True&message=Credentials Valid&uidb64=' + uidb64 + '&token=' + token)
            else:
                return HttpResponseRedirect(os.environ.get('FRONTEND_URL', '') + '?token_valid=False')

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return HttpResponseRedirect("http://localhost:3000/404" + '?token_valid=False')

            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'},
                                status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Пароль успешно изменен'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)




class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateEmailSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'email'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()  # Создаем копию данных
        avatar = data.pop('avatar', None)  # Извлекаем из данных аватар, если есть

        # Создаем сериализатор, указывая исходный объект и данные
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)

        # Обновляем объект с учетом только измененных полей
        self.perform_update(serializer)

        # Обновляем аватар, если был передан новый
        if avatar:
            instance.avatar = avatar
            instance.save()

        # Проверяем успешность обновления и возвращаем соответствующий ответ
        if status.HTTP_200_OK:
            return Response(f"Пользователь {instance.email} успешно обновлен", status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        # Получаем словарь с данными, которые были переданы в запросе
        validated_data = serializer.validated_data

        # Получаем старые значения для неизмененных полей
        old_data = {field: getattr(serializer.instance, field) for field in validated_data if validated_data[field] == ''}
        
        # Обновляем объект
        serializer.save()

        # Восстанавливаем старые значения для неизмененных полей
        for field, value in old_data.items():
            setattr(serializer.instance, field, value)
        serializer.instance.save()




class UserUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateEmailSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'email'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()  # Создаем копию данных
        avatar = request.FILES.getlist('avatar') if request.FILES.getlist('avatar') else None

        # Создаем сериализатор, указывая исходный объект и данные
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)

        # Обновляем объект с учетом только измененных полей
        self.perform_update(serializer)

        # Обновляем аватар, если был передан новый
        if avatar:
            instance.avatar = avatar[0]  # Берем только первый файл из списка
            instance.save()

        # Проверяем успешность обновления и возвращаем соответствующий ответ
        if status.HTTP_200_OK:
            return Response(f"Пользователь {instance.email} успешно обновлен", status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        # Получаем словарь с данными, которые были переданы в запросе
        validated_data = serializer.validated_data

        # Получаем старые значения для неизмененных полей
        old_data = {field: getattr(serializer.instance, field) for field in validated_data if validated_data[field] == ''}
        
        # Обновляем объект
        serializer.save()

        # Восстанавливаем старые значения для неизмененных полей
        for field, value in old_data.items():
            setattr(serializer.instance, field, value)
        serializer.instance.save()


class ProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    lookup_field = 'email'

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserDeleteView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        User.objects.filter(email = request.user.email).delete()
        return Response("deleted",status=204)