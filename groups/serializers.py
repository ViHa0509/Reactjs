from rest_framework import serializers
from django.contrib.auth.models import Group,Permission
# g = Group.objects.all()
# lis = list(g)
# for qs in 
# qs = g.permissions.all()
# ls = list(qs)  
# namelist = []
# for i in ls:
#     namelist.append(i.name)
class GroupUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Group
        fields = ('id','name','permissions')