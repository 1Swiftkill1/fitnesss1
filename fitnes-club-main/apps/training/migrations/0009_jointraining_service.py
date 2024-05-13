# Generated by Django 5.0.2 on 2024-03-03 06:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_serviceitem'),
        ('training', '0008_alter_jointraining_schedule'),
    ]

    operations = [
        migrations.AddField(
            model_name='jointraining',
            name='service',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='services.service', verbose_name='Услуга'),
        ),
    ]
