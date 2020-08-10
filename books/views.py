# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from books.models import Publisher,Author, Book
from books.serializers import PublisherSerializer,AuthorSerializer,BookSerializer
from rest_framework import viewsets

from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth.models import Permission
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from djangoModel.permission import UserPermission

class publisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

    
class authorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    authentication_class =[JWTAuthentication]
    permission_classes = [IsAuthenticated, UserPermission]


class bookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer




                