from django.contrib import admin
from apps.services.models import Service, Schedule, ServiceItem

# write inline
class ServiceItemInline(admin.TabularInline):
    model = ServiceItem
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    inlines = [ServiceItemInline]
    list_display = ("id", "service_type", "trainer")
    list_display_links = ("id", "service_type")
    search_fields = ("service_type", "trainer")


    def has_add_permission(self, request):
        service_count = Service.objects.all().count()
        if service_count < 7:
            return True



@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("id", "service", "date", "start_time", "end_time")
    list_display_links = ("id", "service")
    search_fields = ("service", "date", "start_time", "end_time")
    list_filter = ("service", "date", "start_time", "end_time")
    date_hierarchy = "date"
    ordering = ("date", "start_time")
    list_per_page = 20
    list_editable = ("date", "start_time", "end_time")
    list_filter = ("date", "start_time", "end_time")


