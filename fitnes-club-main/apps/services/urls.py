from django.urls import path
from apps.services.views import ServiceListView, ScheduleListView


urlpatterns = [
    path('service-list/', ServiceListView.as_view(), name='service-list'),
    path('schedule-list/', ScheduleListView.as_view(), name='schedule-list'),
]
