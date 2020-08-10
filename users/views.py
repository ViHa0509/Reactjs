from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from users.serializers import UserSerializer
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth.models import Permission
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from djangoModel.permission import UserPermission

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_class =[JWTAuthentication]
    permission_classes = [IsAuthenticated, UserPermission]