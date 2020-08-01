from django.shortcuts import render
from rest_framework import viewsets
from books.models import Author
from books.serializers import AuthorSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_401_UNAUTHORIZED


class AuthorViewset(viewsets.ModelViewSet): 
    # permission_classes = [AllowAny]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

# class CheckToken()
@api_view(['GET'])
def private(request, format=None):
    return Response({
        'authors': reverse('author-list', request=request, format=format),
    })