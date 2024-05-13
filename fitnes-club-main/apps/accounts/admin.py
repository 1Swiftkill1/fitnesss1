from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


from apps.accounts.models import User, PatientProfile


@admin.register(User)
class PartnerUserAdmin(UserAdmin):
    list_display = ("id", "first_name", "email", "is_staff",'last_login','date_joined')
    list_display_links = ("id", "first_name", )
    readonly_fields = ("date_joined", "last_login")
    filter_horizontal = ("groups", "user_permissions")
    search_fields = ("first_name", "email")
    ordering = ("first_name",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Персональная информация",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "avatar",
                    "phone_number",
                    "active_user",
                    "code",
                )
            },
        ),
        (
            "Доступ",
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Важные даты", {"fields": ("data_activate", "data_expired", "date_joined", "last_login")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "first_name",
                    "last_name",
                    'avatar',
                    "email",
                    "password1",
                    "password2",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )
