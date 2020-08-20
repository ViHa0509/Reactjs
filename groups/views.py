from django.shortcuts import render
from django.contrib.auth.models import Group
from rest_framework import viewsets
from groups.serializers import GroupUserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth.models import Permission
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from djangoModel.permission import UserPermission#,accountPermission
from rest_framework import serializers

# Create your views here.
class GroupViewSet(viewsets.ModelViewSet):

    queryset = Group.objects.all()
    serializer_class = GroupUserSerializer
    authentication_class =[JWTAuthentication]
    permission_classes = [IsAuthenticated, UserPermission]

# @api_view(['GET', 'POST'])
# def test(request):
#     if request.method == 'POST':
#         return Response({"message": "Got some data!", "data": request.data})
#     return Response({"message": "Hello, world!"})
