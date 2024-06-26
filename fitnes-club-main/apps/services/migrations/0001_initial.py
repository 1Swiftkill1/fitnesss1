# Generated by Django 5.0.2 on 2024-02-17 12:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('service_type', models.CharField(choices=[('GYM', 'Тренажёрный зал'), ('YOGA', 'Йога'), ('GROUP', 'Групповые занятия'), ('CYCLE', 'Сайкл-студия'), ('POOL', 'Бассейн'), ('KIDS', 'Детский фитнес'), ('MARTIAL', 'Боевые искусства')], max_length=255, verbose_name='Тип услуги')),
                ('trainer', models.CharField(max_length=255, verbose_name='Тренер')),
            ],
            options={
                'verbose_name': 'Услуга и тренер',
                'verbose_name_plural': 'Услуги и тренеры',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('date', models.DateField(verbose_name='Дата')),
                ('start_time', models.TimeField(verbose_name='Время начала')),
                ('end_time', models.TimeField(verbose_name='Время окончания')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.service', verbose_name='Услуга')),
            ],
            options={
                'verbose_name': 'Расписание',
                'verbose_name_plural': 'Расписание',
                'ordering': ['-id'],
            },
        ),
    ]
