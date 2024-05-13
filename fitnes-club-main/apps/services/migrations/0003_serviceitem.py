# Generated by Django 5.0.2 on 2024-03-03 06:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_service_trainer_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Наименование')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('image', models.ImageField(blank=True, null=True, upload_to='service_item/', verbose_name='Изображение')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.service', verbose_name='Услуга')),
            ],
            options={
                'verbose_name': 'Элемент услуги',
                'verbose_name_plural': 'Элементы услуги',
                'ordering': ['-id'],
            },
        ),
    ]
