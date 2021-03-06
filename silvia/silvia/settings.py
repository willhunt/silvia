"""
Django settings for silvia project.

Generated by 'django-admin startproject' using Django 2.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
from kombu import Exchange, Queue

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'u=-tzcj2zkg5y@w@(r0st)68(2-)6n02c-=3znme-yd4n&(kua'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# DEBUG = False

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '[::1]',
    'rpi-silvia',
    '192.168.0.6'
]


# Application definition

INSTALLED_APPS = [
    'silviacontrol',
    'rest_framework',
    'django_celery_beat',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework.authtoken'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'silvia.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'silvia.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'silviadatabase',
        'USER': 'databaseadmin',
        'PASSWORD': 'databasepwd',
        'HOST': '127.0.0.1',
        'PORT': '',  # Default
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/London'
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    # os.path.join(BASE_DIR, 'dist')
]

# Rest API settings

REST_FRAMEWORK = {
    'DATETIME_FORMAT': "%Y-%m-%d %H:%M:%S",
    'DATE_FORMAT': "%Y-%m-%d",
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    )
}

# Celery settings
CELERY_ENABLE_UTC = True
CELERY_TIMEZONE = 'Europe/London'
# CELERY_BROKER_URL = 'amqp://guest:guest@localhost//' # Rabbitmq
CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Redis
#: Only add pickle to this list if your broker is secured
#: from unwanted access (see userguide/security.html)
CELERY_ACCEPT_CONTENT = ['json']
# CELERY_RESULT_BACKEND = 'db+sqlite:///celery.sqlite'  # Rabbitmq
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'  # Redis
CELERY_TASK_SERIALIZER = 'json'
# Just use this (True) for debuging
CELERY_ALWAYS_EAGER = True
CELERY_EAGER_PROPAGATES_EXCEPTIONS = True
CELERY_ONCE = {
  'backend': 'celery_once.backends.Redis',
  'settings': {
    'url': 'redis://localhost:6379/0',
    'default_timeout': 60 * 60
  }
}
# Define queues as transient to improve performance
CELERY_TASK_QUEUES = (
    Queue('celery', Exchange('transient', delivery_mode=1), routing_key='celery', durable=False),
    Queue('comms', Exchange('transient', delivery_mode=1), routing_key='comms', durable=False),
)

# CORS
# CORS_ORIGIN_WHITELIST = [
#     "http://localhost:8080"
# ]
CORS_ALLOW_HEADERS = [
    "X-CSRFTOKEN"
]

# Whitenoise settings
#   http://whitenoise.evans.io/en/stable/django.html#check-its-working
#   https://cheat.readthedocs.io/en/latest/django/vue.html
WHITENOISE_INDEX_FILE = True  # This means serve index.html for path "/" where appropriate
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Files served at root of application (useful for favicon etc)
WHITENOISE_ROOT = os.path.join(STATIC_ROOT, 'silviacontrol/vue')

# App in simulation mode or not
os_details = os.uname()
if os_details.nodename == "silvia":  # Raspberry pi
    SIMULATE_MACHINE = False
    SIMULATE_SCALE = False
else:  # Development machine
    SIMULATE_MACHINE = True
    SIMULATE_SCALE = False

# ARDUINO_COMMS = "serial"  # "serial" or "i2c"
