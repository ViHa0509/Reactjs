from django.contrib.auth.models import User,Group
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( "id", "username", "password","first_name","last_name","email")
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        group = Group.objects.get(name='PermisionForUser')
        user.groups.add(group)
        return user

    def update(self, instance , validated_data):
        # print('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        instance.first_name =  validated_data.get('first_name', instance.first_name)
        instance.last_name =  validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        # print(instance)
        instance.save()

        return instance

    