from django.urls import path

from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('', views.polymerspa, name='spa'),
    path('brew-view/', views.polymerspa, name='spa'),
    path('info-view/', views.polymerspa, name='spa'),
    path('sessions-view/', views.polymerspa, name='spa'),
    path('session-view/<int:id>', views.polymerspa, name='spa'),
    path('schedule-view/', views.polymerspa, name='spa'),
    path('settings-view/', views.polymerspa, name='spa'),
]
