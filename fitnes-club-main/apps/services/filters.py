import django_filters
from apps.services.models import Schedule


class ScheduleFilter(django_filters.FilterSet):
    service = django_filters.CharFilter(field_name='service__service_type', lookup_expr='icontains')
    data = django_filters.DateFilter(field_name='date', lookup_expr='gte')
    start_time = django_filters.TimeFilter(field_name='start_time', lookup_expr='gte')
    end_time = django_filters.TimeFilter(field_name='end_time', lookup_expr='lte')

    class Meta:
        model = Schedule
        fields = ['service', 'date', 'start_time', 'end_time']


