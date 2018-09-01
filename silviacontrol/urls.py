from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'settings', views.SettingsViewSet)
router.register(r'status', views.StatusViewSet)
router.register(r'response', views.ResponseViewSet)
router.register(r'session', views.SessionViewSet)

urlpatterns = [
    # Rest API routing
    url(r'^api/v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls')),
    # Django routing
    path('easter/', views.index, name='index'),
    # Polymer routing
    path('', views.polymerspa, name='spa'),
    path('brew-view/', views.polymerspa, name='spa'),
    path('info-view/', views.polymerspa, name='spa'),
    path('sessions-view/', views.polymerspa, name='spa'),
    path('session-view/<int:id>', views.polymerspa, name='spa'),
    path('schedule-view/', views.polymerspa, name='spa'),
    path('settings-view/', views.polymerspa, name='spa'),
]
