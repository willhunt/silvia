from django.urls import path
from django.conf.urls import url, include
from django.conf import settings
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'settings', views.SettingsViewSet)
router.register(r'status', views.StatusViewSet)
router.register(r'response', views.ResponseViewSet, basename='response')
router.register(r'session', views.SessionViewSet)
router.register(r'schedule', views.ScheduleViewSet)
# router.register(r'override', views.ManualControlViewSet, basename='override')

urlpatterns = [
    # Rest API routing
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/override', views.ManualControlView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls')),
    # Django routing
    path('easter/', views.index, name='index'),
]
