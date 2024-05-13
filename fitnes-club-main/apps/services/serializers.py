from rest_framework import serializers
from apps.services.models import Service, Schedule, ServiceItem
from apps.training.models import JoinTraining

MONTHS = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь',
}

class ServiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceItem
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):

    service_type = serializers.SerializerMethodField(read_only=True)
    items = serializers.SerializerMethodField(read_only=True)

    def get_items(self,obj):
        return ServiceItemSerializer(obj.items.all(),many=True).data

    def get_service_type(self, obj):
        return {
            'key':obj.service_type,
            'value':obj.get_service_type_display()
        }


    class Meta:
        model = Service
        fields = ("id", "service_type", "trainer",'items')


class ScheduleSerializer(serializers.ModelSerializer):
    service_title = serializers.SerializerMethodField(read_only=True)
    user_count = serializers.SerializerMethodField(read_only=True)
    trainer = serializers.SerializerMethodField(read_only=True)
    date_name = serializers.SerializerMethodField(read_only=True)
    service_item = serializers.SerializerMethodField(read_only=True)

    def get_service_item(self,obj):
        return ServiceItemSerializer(obj.service_item,many=False).data

   
    def get_user_count(self, obj):

        return JoinTraining.objects.filter(schedule=obj, ).count()

    def get_trainer(self, obj):
        return {
            'name': obj.service.trainer,
            "avatar": obj.service.trainer_avatar.url
        }

    def get_service_title(self, obj):
        return obj.service.service_type

    def get_date_name(self, obj):
        return f"{obj.date.day} {MONTHS[obj.date.month]}"

    class Meta:
        model = Schedule
        fields = ("id", "service",'service_item', 'participants',"trainer",  "service_title", 'user_count',
                  "date", 'date_name', "start_time", "end_time")
