# Generated by Django 5.0.2 on 2024-02-27 17:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0004_remove_jointraining_date_jointraining_schedule'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jointraining',
            name='service',
        ),
    ]
