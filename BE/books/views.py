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

@api_view(['POST'])
@permission_classes([AllowAny, ])
def login(request):
    username = request.data['username']
    password = request.data['password']

    user = authenticate(username=username, password=password)
    print(user)
    if not user:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)
    print(token.key)
    return Response({"token": token.key})


# @api_view(['POST'])
# @permission_classes([AllowAny, ])
# def authenticate_user(request):
#     try:
#         username = request.data['username']
#         password = request.data['password']
 
#         user = User.objects.get(username=username, password=password)
#         if user:
#             try:
#                 payload = jwt_payload_handler(user)
#                 token = jwt.encode(payload, settings.SECRET_KEY)
#                 user_details = {}
#                 user_details['name'] = "%s %s" % (
#                     user.first_name, user.last_name)
#                 user_details['token'] = token
#                 user_logged_in.send(sender=user.__class__,
#                                     request=request, user=user)
#                 return Response(user_details, status=status.HTTP_200_OK)
 
#             except Exception as e:
#                 raise e
#         else:
#             res = {
#                 'error': 'can not authenticate with the given credentials or the account has been deactivated'}
#             return Response(res, status=status.HTTP_403_FORBIDDEN)
#     except KeyError:
#         res = {'error': 'please provide a email and a password'}
#         return Response(res)


@api_view(['GET'])
def private(request, format=None):
    return Response({
        'authors': reverse('author-list', request=request, format=format),
    })