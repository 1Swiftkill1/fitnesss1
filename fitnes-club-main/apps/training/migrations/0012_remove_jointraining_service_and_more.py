# Generated by Django 5.0.2 on 2024-03-03 17:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0011_remove_userjointraining_serviceitem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jointraining',
            name='service',
        ),
        migrations.RemoveField(
            model_name='jointraining',
            name='serviceitem',
        ),
        migrations.RemoveField(
            model_name='jointraining',
            name='type',
        ),
    ]
