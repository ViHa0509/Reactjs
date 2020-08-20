from rest_framework import serializers
from django.contrib.auth.models import Group,Permission
from permissions.serializers import PermissionSerializer
class GroupUserSerializer(serializers.ModelSerializer):
    # perm = PermissionSerializer(many=True, read_only=True) 
    class Meta:
        model = Group
        fields = ('id','name','permissions')

    def create(self, validated_data):
        perm_data = validated_data.pop('permissions')
        group = Group(**validated_data)
        group.save()
        for perm_data in perm_data:
            group.permissions.add(perm_data)
        return group

    def update(self, instance , validated_data):

        listoldperm = instance.permissions.all()
        instance.name = validated_data.get('name', instance.name)
        listnewperm = validated_data.get('permissions')

        for old in listoldperm:
            instance.permissions.remove(old.id)

        for new in listnewperm:
            instance.permissions.add(new.id)
            
        instance.save()
        return instance