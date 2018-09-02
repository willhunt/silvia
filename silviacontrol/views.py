from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, generics
from .models import (SettingsModel, StatusModel, SessionModel,
                        ResponseModel)
from .serializers import (SettingsSerializer, StatusSerializer, SessionSerializer,
                            ResponseSerializer)


# Html Views -----------
def index(request):
    return HttpResponse("You're at Silvia Mission Control")

def polymerspa(request):
    """
    Render polymer single page app (spa) front end
    """
    context = {}
    return render(request, 'silviacontrol/polymerspa.html', context)

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


class ResponseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for machine status to be viewed or edited
    """
    serializer_class = ResponseSerializer
    queryset = ResponseModel.objects.all()

    # def get_queryset(self):
    #     queryset = ResponseModel.objects.all()
    #     position = self.request.query_params.get('position', None)
    #     if position == 'latest':
    #         last_id = queryset.order_by('-t')[0].id
    #         queryset = queryset.filter(id=last_id)
    #     return queryset

    def get_object(self):
        # position = self.request.query_params.get('position', None)
        if self.kwargs['pk'] == 'latest':
            obj = ResponseModel.objects.order_by('-t')[0]
            return obj
        else:
            return super(ResponseViewSet, self).get_object()


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
