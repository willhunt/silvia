from django.urls import path
from django.conf.urls import url, include
from django.conf import settings
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'settings', views.SettingsViewSet)
router.register(r'status', views.StatusViewSet)
router.register(r'response', views.ResponseViewSet, base_name='response')
router.register(r'session', views.SessionViewSet)
router.register(r'schedule', views.ScheduleViewSet)

urlpatterns = [
    # Rest API routing
    url(r'^api/v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls')),
    # Django routing
    path('easter/', views.index, name='index'),
]

# Front end routing
FRONT_END = getattr(settings, "FRONT_END", None)
# Polymer routing
if FRONT_END == 'polymerjs':
    urlpatterns +=  [
        path('', views.polymerspa, name='spa'),
        path('brew-view/', views.polymerspa, name='spa'),
        path('info-view/', views.polymerspa, name='spa'),
        path('sessions-view/', views.polymerspa, name='spa'),
        path('session-view/<int:id>', views.polymerspa, name='spa'),
        path('schedule-view/', views.polymerspa, name='spa'),
        path('settings-view/', views.polymerspa, name='spa'),
    ]
# Vue routing
elif FRONT_END == 'vuejs':
    urlpatterns += [
        path('', views.vuejsspa, name='spa'),
    ]
    
