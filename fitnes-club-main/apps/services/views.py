from rest_framework import generics
from apps.services.serializers import ServiceSerializer, ScheduleSerializer
from apps.services.models import Service, Schedule
from apps.services.filters import ScheduleFilter
from apps.accounts.permissions import IsOwnUserOrReadOnly
from rest_framework import permissions
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime, timedelta
from rest_framework.response import Response


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title']
    pagination_class = None


class ScheduleListView(generics.ListAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ScheduleFilter
    search_fields = ['title']
    pagination_class = None

    WEEK_DAYS = {
        0: 'Понедельник',
        1: 'Вторник',
        2: 'Среда',
        3: 'Четверг',
        4: 'Пятница',
        5: 'Суббота',
        6: 'Воскресенье',
    }

    MONTHS = {
        1: 'Январь',
        2: 'Февраль',
        3: 'Март',
        4: 'Апрель',
        5: 'Май',
        6: 'Июнь',
        7: 'Июль',
        8: 'Август',
        9: 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь',
    }

    TIMES = range(8, 21)

    def list(self, request, *args, **kwargs):
        today = datetime.today()
        if date := request.GET.get('date_count'):
            today = today + timedelta(days=int(date)*7)
        week = today.weekday()
        start_week = today + timedelta(days=-week)
        end_week = today + timedelta(days=6-week)
        schedules = Schedule.objects.filter(date__range=[start_week, end_week])
        data = []
        for i in self.TIMES:
            time_schedules = schedules.filter(start_time__hour=i)
            days = []
            for j in range(7):
                day = start_week + timedelta(days=j)
                day_schedule = time_schedules.filter(date=day).first()
                days.append({
                    'day': self.WEEK_DAYS[j],
                    'date': f"{day.day:02d}",
                    'month': f"{day.month:02d}",
                    'is_free': not day_schedule,
                    'schedule': ScheduleSerializer(day_schedule, many=False).data if day_schedule else None
                })
            data.append({
                'time': f'{i:02d}:00',
                'days': days
            })

        return Response({'month': self.MONTHS[today.month], 'data': data})
