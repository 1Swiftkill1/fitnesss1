from rest_framework import serializers
from apps.services.models import Schedule
from apps.services.serializers import ServiceItemSerializer
from apps.training.models import  AbonomentAplication, JoinTraining, UserJoinTraining


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


class AbonomentAplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AbonomentAplication
        fields = ("id", "user", "type", "phone", "email", "name")
        read_only_fields = ('user',)

    def validate(self, data):
        if data["type"] == "lite":
            if AbonomentAplication.objects.filter(user=self.context['request'].user, type="lite").exists():
                raise serializers.ValidationError(
                    "У вас уже есть абонемент Lite")
        if data["type"] == "space":
            if AbonomentAplication.objects.filter(user=self.context['request'].user, type="space").exists():
                raise serializers.ValidationError(
                    "У вас уже есть абонемент Space")
        if data["type"] == "flex":
            if AbonomentAplication.objects.filter(user=self.context['request'].user, type="flex").exists():
                raise serializers.ValidationError(
                    "У вас уже есть абонемент Flex")
        if AbonomentAplication.objects.filter(user=self.context['request'].user).exists():
            raise serializers.ValidationError("У вас уже есть абонемент")

        return data


class JoinTrainingSerializer(serializers.ModelSerializer):
    service_title = serializers.SerializerMethodField(read_only=True)
    trainer = serializers.SerializerMethodField(read_only=True)
    date = serializers.SerializerMethodField(read_only=True)
    start_time = serializers.TimeField(source='schedule.start_time', format='%H:%M',read_only=True)
    end_time = serializers.TimeField(source='schedule.end_time', format='%H:%M',read_only=True)
    service_item = serializers.SerializerMethodField(read_only=True)

    def get_service_item(self,obj):
        return ServiceItemSerializer(obj.schedule.service_item,many=False).data

   

    def get_date(self,obj):
        return f"{obj.schedule.date.day} {MONTHS[obj.schedule.date.month]}" 


    def get_trainer(self, obj):
        return obj.schedule.service.trainer

    def get_service_title(self, obj):
        return obj.schedule.service.service_type

    class Meta:
        model = JoinTraining
        fields = ("id", "user",  'schedule', "trainer",
                  "service_title",'service_item', "date", "phone", "email", "name",'start_time',"end_time")

    def validate(self, data):
        schedule = data['schedule']
        if JoinTraining.objects.filter(schedule = schedule).count()>schedule.participants:
            raise serializers.ValidationError("Расписание уже заполнено. Нельзя добавить больше участников.")

        if JoinTraining.objects.filter(user=data['user'],schedule=schedule ).exists():
            raise serializers.ValidationError(
                "Вы уже записаны на эту тренировку")
        return data



class PartipicantJoinTrainingSerializer(serializers.Serializer):
    date = serializers.DateField(write_only=True)
    time = serializers.TimeField(write_only=True)
    service = serializers.CharField(write_only=True)

class UserJoinSerializer(serializers.ModelSerializer):
    trainer = serializers.CharField(source='service.trainer',read_only=True)
    service_title= serializers.CharField(source='service.service_type',read_only=True)
    
    class Meta:
        model = UserJoinTraining
        fields = '__all__'