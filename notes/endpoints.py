from django.urls import path, include, re_path
from rest_framework import routers

from .api import *

router = routers.DefaultRouter()
router.register(r'^notes', NoteViewSet, 'notes')

urlpatterns = [
    path('', include(router.urls)),
    re_path(r'^auth/register/$', RegistrationAPI.as_view()),
    re_path(r'^auth/login/$', LoginAPI.as_view()),
    re_path(r'^auth/user/', UserAPI.as_view()),
    re_path(r'^login', LoginView.as_view()),
]
