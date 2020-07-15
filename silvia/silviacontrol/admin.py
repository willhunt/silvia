from django.contrib import admin
from .models import (SettingsModel, ScheduleModel, SessionModel,
                     StatusModel, ResponseModel)

# See readonly time field in admin interface
class ResponseModelAdmin(admin.ModelAdmin):
    readonly_fields = ('t',)
admin.site.register(ResponseModel, ResponseModelAdmin)

admin.site.register([
    SettingsModel,
    ScheduleModel,
    SessionModel,
    StatusModel
])

