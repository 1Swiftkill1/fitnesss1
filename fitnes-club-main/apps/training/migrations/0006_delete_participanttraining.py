
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0005_remove_jointraining_service'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ParticipantTraining',
        ),
    ]
