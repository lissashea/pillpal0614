"""
Django settings for pillPal project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv
from decouple import config

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# dotenv_path = os.path.join(BASE_DIR, '.env')
# load_dotenv(dotenv_path)

DEBUG = True
SECRET_KEY = 'kdaa60dn*mnj-!2iwsxa@wm*m(m*0#)#18*y5!x1m=twrk6n03'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-_qt5t2h)^tyxn8=!zw$%=14e_ssorn!6k_ake_dg830nkur($^'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = config('DEBUG',cast=bool)

# ALLOWED_HOSTS = ['http://localhost', '.herokuapp.com','railway.app']

ALLOWED_HOSTS = ['localhost','http://localhost','127.0.0.1', '0.0.0.0', 'railway.app','.herokuapp.com','.netlify.app']


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:3002",
    "https://pillpal-a113c55bba4b.herokuapp.com",
    "https://main--timely-crisp-3f77ad.netlify.app",
    "https://pill-pal.app"
]
# Application definition

INSTALLED_APPS = [
    'api',
    'rest_framework',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # <-------Add this line here (above Common Middleware)
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'pillPal.urls'

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

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

WSGI_APPLICATION = 'pillPal.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# db_name = 'digi_be'
# user = 'postgres'
# password = '123'


db_name = 'pp'
user = 'pp_admin'
password = 'password'

local_db_url = f'postgres://{user}:{password}@localhost:5432/{db_name}'


production_db_url = os.environ.get('DATABASE_URL')

DATABASES = {

    'default': dj_database_url.parse(production_db_url) if production_db_url else dj_database_url.parse(local_db_url)
}

# if 'DJANGO_SETTINGS_MODULE' in os.environ and os.environ['DJANGO_SETTINGS_MODULE'] == 'pillPal.settings_heroku':
#     # Heroku production environment
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.postgresql',
#             'NAME': 'dchgm5jcotscc1',
#             'USER': 'xncowvtopmivce',
#             'PASSWORD': '50aaec88f6a5a4e61c730a8f4047f0a70d340de973526c110aa265d77e4c09a3',
#             'HOST': 'ec2-44-208-206-97.compute-1.amazonaws.com',
#             'PORT': '5432'
#         }
#     }
# else:
#     # Local development environment
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.postgresql',
#             'NAME': 'pp',
#             'USER': 'pp_admin',
#             'PASSWORD': 'password',
#             'HOST': 'localhost',
#             'PORT': '5432'
#         }
#     }

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'api.authentication.JWTAuthentication',
    ],
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# django_heroku.settings(locals())

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
