from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, generics
from rest_framework.decorators import action
from .models import (SettingsModel, StatusModel, SessionModel,
                        ResponseModel, ScheduleModel)
from .serializers import (SettingsSerializer, StatusSerializer, SessionSerializer,
                            ResponseSerializer, ScheduleSerializer)
from .utils import debug_log


# Html Views -----------
def index(request):
    return HttpResponse("You're at Silvia Mission Control")

# API Views -----------
class SettingsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows settings to be viewed or edited
    """
    # if not SettingsModel.objects.filter(id=1).exists():
    try:
        SettingsModel.objects.filter(id=1)
    except:
        # If there are no settings, create them
        settings = SettingsModel()
        settings.save()
    queryset = SettingsModel.objects.all()
    serializer_class = SettingsSerializer


class StatusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows settings to be viewed or edited
    """
    # if not SettingsModel.objects.filter(id=1).exists():
    try:
        StatusModel.objects.filter(id=1)
    except:
        # If there are no settings, create them
        status = StatusModel()
        status.save()
    queryset = StatusModel.objects.all()
    serializer_class = StatusSerializer

    def update(self, request, pk=None):
        print(request.data)
        data=request.data
        # Get current status
        last_status = StatusModel.objects.get(id=1)
         # Start or end session based upon status change
        if data["on"] and not last_status.on:  # If machine is being turned on
            # Create a new session
            session = SessionModel()
            session.save()
        elif last_status.on and not data["on"]:  # If machine is being turned off
            # Get current session
            session = SessionModel.objects.filter(active=True).order_by('-id')[0]
            session.set_end_time()
            session.save()
        return super().update(request, pk)

    @action(methods=['get', 'put'], detail=True)  # Detail/instance or collection/list
    def update_session(self, request, pk=None):
        print("use this like root/api/v1/status/1/update_session, might be useful")


class ResponseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for machine responses to be viewed or edited
    """
    serializer_class = ResponseSerializer
    queryset = ResponseModel.objects.all()

    def get_object(self):
        # Override get_object to see ig request is for latest object
        if self.kwargs['pk'] == 'latest':
            response = ResponseModel.objects.order_by('-t')[0]
            if (timezone.now() - response.t).total_seconds() > 10:
                response = None
            return response
        else:
            return super(ResponseViewSet, self).get_object()

    def get_queryset(self):
        queryset = ResponseModel.objects.all()
        session_id = self.request.query_params.get('session', None)
        if session_id is not None:
            session = SessionModel.objects.get(id=session_id)
            queryset = ResponseModel.objects.filter(t__range=(session.t_start, session.t_end))
        return queryset

class SessionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for on/off sessions to be viewed or edited
    """
    queryset = SessionModel.objects.all()
    serializer_class = SessionSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    """
    API endpoint for machine schedules to be viewed or edited
    """
    queryset = ScheduleModel.objects.all()
    serializer_class = ScheduleSerializer

