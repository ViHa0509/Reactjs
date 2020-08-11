"""djangoModel URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.urls import path
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views
from . import views

from books.views import authorViewSet
from users.views import UserViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'authors', authorViewSet)
router.register(r'users', UserViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('register/',views.RegisterUser.as_view(),name = 'register'),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'), 
    url('', include(router.urls)),
]

# urlpatterns += include('books.urls')
# urlpatterns += include('books.urls')

# def get_user(user_id):
#     """
#     :param user_id: int, to get sdkf
#     :ret object: user object
#     """
