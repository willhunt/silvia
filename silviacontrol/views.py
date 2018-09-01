from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import (SettingsModel, StatusModel, SessionModel,
                        ResponseModel)
from .serializers import (SettingsSerializer, StatusSerializer, SessionSerializer,
                            ResponseSerializer)


# Create your views here.
def index(request):
    return HttpResponse("You're at Silvia Mission Control")

def polymerspa(request):
    """
    Render polymer single page app (spa) front end
    """
    context = {}
    return render(request, 'silviacontrol/polymerspa.html', context)

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


class ResponseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for machine status to be viewed or edited
    """
    # try:
    #     ResponseModel.objects.all()
    # except:
    #     # If there are no settings, create them
    #     status = StatusModel()
    #     status.save()
    queryset = ResponseModel.objects.all()
    serializer_class = ResponseSerializer


class SessionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for machine status to be viewed or edited
    """
    # try:
    #     SessionModel.objects.all()
    # except:
    #     # If there are no settings, create them
    #     status = StatusModel()
    #     status.save()
    queryset = SessionModel.objects.all()
    serializer_class = SessionSerializer
