from django.db import models
from apps.common.models import BaseModel
from django.core.exceptions import ValidationError

SERVICE_TYPE = (
    ('GYM', 'Тренажёрный зал'),
    ('YOGA', 'Йога'),
    ('GROUP', 'Групповые занятия'),
    ('CYCLE', 'Сайкл-студия'),
    ('POOL', 'Бассейн'),
    ('KIDS', 'Детский фитнес'),
    ('MARTIAL', 'Боевые искусства'),
)


class Service(BaseModel):
    service_type = models.CharField(max_length=255, choices=SERVICE_TYPE, verbose_name='Тип услуги')
    trainer = models.CharField(max_length=255, verbose_name='Тренер')
    trainer_avatar = models.ImageField(upload_to='trainer_avatar/', verbose_name='Аватар тренера')

    class Meta:
        verbose_name = 'Услуга и тренер'
        verbose_name_plural = 'Услуги и тренеры'
        ordering = ['-id']


    def __str__(self):
        return self.service_type
    
class ServiceItem(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name='Услуга',related_name = 'items')
    name = models.CharField(max_length=255, verbose_name='Наименование', blank=True, null=True)
    description = models.TextField(verbose_name='Описание', blank=True, null=True)
    image = models.ImageField(upload_to='service_item/', verbose_name='Изображение', blank=True, null=True)

    class Meta:
        verbose_name = 'Элемент услуги'
        verbose_name_plural = 'Элементы услуги'
        ordering = ['name']

    def __str__(self):
        return self.service.service_type + ' -- ' + self.name


class Schedule(BaseModel):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name='Услуга')
    service_item = models.ForeignKey(ServiceItem,on_delete = models.CASCADE,verbose_name = "Услуга элемент")
    date = models.DateField(verbose_name='Дата')
    start_time = models.TimeField(verbose_name='Время начала')
    end_time = models.TimeField(verbose_name='Время окончания')
    participants = models.IntegerField(default = 10)



    class Meta:
        verbose_name = 'Расписание'
        verbose_name_plural = 'Расписание'
        ordering = ['-id']

    def clean(self):
        if self.service_item.service != self.service:
            raise ValidationError(f"Выбранный элемент услуги '{self.service_item.name}' должен быть связан с той же услугой '{self.service.service_type}'.")


    def save(self, *args, **kwargs):
        self.clean()  
        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.service.service_type}--{self.date}-- {self.start_time.strftime('%H:%m')}-{self.end_time.strftime('%H:%m')}"


class UserSchedule(BaseModel):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name='Услуга')
    date = models.DateField(verbose_name='Дата')
    start_time = models.TimeField(verbose_name='Время начала')
    end_time = models.TimeField(verbose_name='Время окончания')



    class Meta:
        verbose_name = 'Расписание'
        verbose_name_plural = 'Расписание'
        ordering = ['-id']


    def __str__(self):
        return f"{self.service.service_type}--{self.date}-- {self.start_time.strftime('%H:%m')}-{self.end_time.strftime('%H:%m')}"
