from rest_framework import serializers
from .models import (SettingsModel, ScheduleModel, SessionModel,
                     StatusModel, ResponseModel)

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingsModel
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusModel
        fields = '__all__'


class ResponseSerializer(serializers.ModelSerializer):
    response_time = serializers.ReadOnlyField()
    response_date = serializers.ReadOnlyField()
    class Meta:
        model = ResponseModel
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    start_time = serializers.ReadOnlyField()
    start_date = serializers.ReadOnlyField()
    class Meta:
        model = SessionModel
        fields = ('id', 'start_time', 'start_date', 't_start', 't_end', 'active') 


class ScheduleSerializer(serializers.ModelSerializer):
    #  https://stackoverflow.com/questions/44703213/problems-to-serialize-property-getter-and-setter-from-a-model-using-django-res
    start_time = serializers.CharField()
    end_time = serializers.CharField()
    class Meta:
        model = ScheduleModel
        fields = ('id', 'name', 'start_time', 'end_time', 'active', 'days') 

    def create(self, validated_data):
        schedule = ScheduleModel.objects.create()
        return schedule

