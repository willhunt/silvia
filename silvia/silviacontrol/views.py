from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (SettingsModel, StatusModel, SessionModel,
                        ResponseModel, ScheduleModel)
from .serializers import (SettingsSerializer, StatusSerializer, SessionSerializer,
                            ResponseSerializer, ScheduleSerializer)
from .utils import debug_log
import json
from .tasks import async_power_machine, async_get_response, async_toggle_brew
from django.conf import settings


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
    API endpoint that allows status to be viewed or edited
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
            # Actually turn machine on
            async_power_machine.delay(True)

            # Create a new session
            session = SessionModel()
            session.save()

            # If simulating, set temperature to 20degC
            if settings.SIMULATE_MACHINE:
                response = ResponseModel.objects.create(
                    T_boiler=20,
                    duty=0,
                    duty_p=0,
                    duty_i=0,
                    duty_d=0
                )
                response.save()

        elif last_status.on and not data["on"]:  # If machine is being turned off
            # Actually turn machine off
            async_power_machine.delay(False)

            # Get current session
            session = SessionModel.objects.filter(active=True).order_by('-id')[0]
            session.set_end_time()
            session.save()

        elif not last_status.brew and data["brew"]:  # If brewing is starting
            async_toggle_brew(True)

        elif last_status.brew and not data["brew"]:  # If brewing  is stopped
            async_toggle_brew(False)

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
        # Override get_object to see if request is for latest object
        if self.kwargs['pk'] == 'latest':
            response = ResponseModel.objects.order_by('-t')[0]
            # if (timezone.now() - response.t).total_seconds() > 10:
            #     response = None

            # Just for testing purposes fire task here
            # async_get_response.delay()

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

    @action(detail=False, methods=['get'])
    def sessions(self, request):
        """
        Query responses for multiple sessions
        """
        session_ids_string = request.query_params.get('session', None)
        
        if session_ids_string == "active":
            session = SessionModel.objects.filter(active=True).order_by(-t_start)[0]
            queryset = ResponseModel.objects.filter(t__range=(session.t_start, timezone.now()))
            return Response(queryset)

        if session_ids_string is not None:
            session_ids = [int(x) for x in session_ids_string.split(',')]
            queryset_dict = {}
            for session_id in session_ids:
                session = SessionModel.objects.get(id=session_id)
                if session.t_end is None:
                    queryset = ResponseModel.objects.filter(t__range=(session.t_start, timezone.now()))
                else:
                    queryset = ResponseModel.objects.filter(t__range=(session.t_start, session.t_end))
                queryset_dict[session_id] = self.serializer_class(queryset, many=True).data
            return Response(queryset_dict)
        return ResponseModel.objects.all()


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

