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
    class Meta:
        model = ResponseModel
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionModel
        fields = '__all__'


