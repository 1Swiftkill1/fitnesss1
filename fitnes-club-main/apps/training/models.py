from django.db import models
from apps.common.models import BaseModel
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.accounts.models import User
from apps.services.models import Schedule, Service, ServiceItem





class AbonomentAplication(BaseModel):
    TYPE = (
        ('lite', 'Lite'),
        ('space', 'Space'),
        ('flex', 'Flex'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    type = models.CharField(max_length=255, choices=TYPE, verbose_name='Тип абонемента')
    phone = models.CharField(max_length=255, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Email')
    name = models.CharField(max_length=255, verbose_name='Имя')

    class Meta:
        verbose_name = 'Заявка на абонемент'
        verbose_name_plural = 'Заявки на абонементы'
        ordering = ['-id']


    def __str__(self):
        return self.name




class JoinTraining(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, verbose_name='Расписание', blank=True, null=True)
    phone = models.CharField(max_length=255, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Email')
    name = models.CharField(max_length=255, verbose_name='Имя')

    class Meta:
        verbose_name = 'Заявка на тренировку'
        verbose_name_plural = 'Заявки на тренировки'
        ordering = ['-id']

    def __str__(self):
        return self.name
    

class UserJoinTraining(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name='Услуга', blank=True, null=True)
    date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    class Meta:
        verbose_name = 'Заявка на тренировку'
        verbose_name_plural = 'Заявки на тренировки'
        ordering = ['-id']

    def __str__(self):
        return self.user.email