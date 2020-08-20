from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.core.serializers import serialize
from djangoModel import settings
from rest_framework.response import Response
#for register
# from users.serializers import UserSerializer
# from django.contrib.auth.models import User, Group
# from rest_framework.generics import CreateAPIView,UpdateAPIView
# from django.contrib.auth import get_user_model
from rest_framework import status
# from django.contrib.auth.models import Permission
# from djangoModel.permission import UserPermission#,accountPermission
# from rest_framework import serializers

# class RegisterUser(CreateAPIView):
#     permission_class = [AllowAny]
#     model = get_user_model()
#     serializer_class = UserSerializer
#     authentication_class =[JWTAuthentication]
#     permission_classes = [IsAuthenticated, UserPermission]
    
class UserLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        data = request.data

        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(request, username=username, password=password)
        print("=====================")
        if user:
            refresh = TokenObtainPairSerializer.get_token(user)
            check = user.is_superuser
            
            if check == False:
                datatoken = {
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token),
                    # 'access_expires': int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
                    # 'refresh_expires': int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
                    'role' : 'user'
                } 
            else:
                datatoken = {
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token),
                    # 'access_expires': int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
                    # 'refresh_expires': int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
                    'role' : 'admin'
                }
            return Response(datatoken, status=status.HTTP_200_OK)       

        return Response({
            # 'error_messages': serializer.errors,
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)
