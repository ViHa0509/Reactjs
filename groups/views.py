from django.shortcuts import render
from django.contrib.auth.models import Group
from rest_framework import viewsets
from groups.serializers import GroupUserSerializer
# Create your views here.
class GroupViewSet(viewsets.ModelViewSet):

    queryset = Group.objects.all()
    serializer_class = GroupUserSerializer
    # authentication_class =[JWTAuthentication]
    # permission_classes = [IsAuthenticated, UserPermission]

