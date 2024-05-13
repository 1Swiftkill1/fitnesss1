# Generated by Django 5.0.2 on 2024-02-26 20:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_service_trainer_avatar'),
        ('training', '0003_jointraining'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jointraining',
            name='date',
        ),
        migrations.AddField(
            model_name='jointraining',
            name='schedule',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='services.schedule', verbose_name='Расписание'),
            preserve_default=False,
        ),
    ]