from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from apps.common.utils import generate_random_code
from .manager import AccountManager




class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True, db_index=True, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True, null=True, verbose_name="Имя")
    last_name = models.CharField(max_length=30, blank=True, null=True, verbose_name="Фамилия")
    father_name = models.CharField(max_length=30, blank=True, null=True, verbose_name="Отчество")
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name= "Дата регистрации")
    last_login = models.DateTimeField(auto_now=True, verbose_name= "Последний вход")
    phone_number = models.CharField(max_length=30, blank=True, null=True, verbose_name="Номер телефона")
    code = models.CharField(max_length=8, unique=True, default=generate_random_code)
    data_activate = models.DateField(blank=True, null=True, verbose_name="Дата активации")
    data_expired = models.DateField(blank=True, null=True, verbose_name="Дата окончания")
    active_user = models.BooleanField(default=False, verbose_name="Статус активации")
    is_admin = models.BooleanField(default=False, verbose_name="Админ")
    is_staff = models.BooleanField(default=False, verbose_name="Персонал")
    is_active = models.BooleanField(default=True, verbose_name="Активный")
    is_superuser = models.BooleanField(default=False, verbose_name="Суперпользователь")
    avatar = models.ImageField(upload_to="users/%Y/%m/", blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = AccountManager()



    def __str__(self):
        return str(self.first_name) if self.first_name else str(self.email)

    def has_module_perms(self, app_label):
        return self.is_superuser

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        data = {"refresh": str(refresh), "access": str(refresh.access_token)}
        return data

    @property
    def image_url(self):
        if self.avatar:
            if settings.DEBUG:
                return f'{settings.LOCAL_BASE_URL}{self.avatar.url}'
            return f'{settings.PROD_BASE_URL}{self.avatar.url}'
        else:
            return None



    def save(self, *args, **kwargs):
        if not self.code:
            self.code = generate_random_code()
        super().save(*args, **kwargs)


    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to="profile_pics", blank=True, null=True)
    address = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return str(self.user)

    class Meta:
        verbose_name = "Профиль пользователя"
        verbose_name_plural = "Профили пользователей"
        ordering = ["-id"]

















