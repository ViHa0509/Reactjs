from django.contrib.auth.models import User,Group
from rest_framework import serializers
from groups.serializers import GroupUserSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( "id", "username", "password","first_name","last_name","email","groups",)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        groups_data = validated_data.pop('groups')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        for group_data in groups_data:
            user.groups.add(group_data)
        return user

    def update(self, instance , validated_data):
        oldgroup = instance.groups.all().first().id
        instance.first_name =  validated_data.get('first_name', instance.first_name)
        instance.last_name =  validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        newgroup = validated_data.get('groups')
        
        findId = Group.objects.filter(name = str(newgroup[0]))
        newId = findId.first().id
        
        instance.groups.remove(oldgroup)
        instance.groups.add(newId)
        instance.save()
        return instance