from django.contrib import admin
from .models import (SettingsModel, ScheduleModel, SessionModel,
                     StatusModel, ResponseModel)

admin.site.register([
    SettingsModel,
    ScheduleModel,
    SessionModel,
    StatusModel,
    ResponseModel,
])
