# Generated by Django 5.0.2 on 2024-02-26 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='trainer_avatar',
            field=models.ImageField(default=1, upload_to='trainer_avatar/', verbose_name='Аватар тренера'),
            preserve_default=False,
        ),
    ]
