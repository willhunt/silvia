from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render_to_response
from silvia.settings import BASE_DIR
import os

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at Silvia Mission Control")

def polymerspa(request):
    context = {}
    return render(request, 'silviacontrol/polymerspa.html', context)
