from django.contrib import admin
from apps.training.models import  AbonomentAplication, JoinTraining, UserJoinTraining





@admin.register(AbonomentAplication)
class AbonomentAplication(admin.ModelAdmin):
    list_display = ("id", "user", "type", "phone", "email", "name")
    list_display_links = ("id", "user", "type")
    search_fields = ("user", "type")
    ordering = ("id",)
    list_filter = ("type",)



@admin.register(JoinTraining)
class JoinTrainingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "get_service_type", "get_schedule_date", "created_at", )
    list_display_links = ("id", "user", "get_service_type")  # update here
    search_fields = ("user__username", "schedule__service__name")
    ordering = ("id",)
    list_filter = ("schedule__date",)

    def get_service_type(self, obj):
        return obj.schedule.service.service_type if obj.schedule else None

    get_service_type.short_description = "Service Type"

    def get_schedule_date(self, obj):
        return obj.schedule.date if obj.schedule else None

    get_schedule_date.short_description = "Schedule Date"


@admin.register(UserJoinTraining)
class UserJoinTrainingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "service", "date")
    list_display_links = ("id", "user", "service")
    search_fields = ("user", "service")
    ordering = ("id",)
    list_filter = ("date",)