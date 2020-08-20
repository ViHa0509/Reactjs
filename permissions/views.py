from django.shortcuts import render

from django.shortcuts import render
from django.contrib.auth.models import Permission
from rest_framework import viewsets
from permissions.serializers import PermissionSerializer
from djangoModel.permission import UserPermission
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.
class PermissionViewSet(viewsets.ModelViewSet):

    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    authentication_class =[JWTAuthentication]
    permission_classes = [IsAuthenticated, UserPermission]