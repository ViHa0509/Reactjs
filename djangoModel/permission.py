from rest_framework import permissions

class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        print('^'*50)
        if view.action == 'list':
            return request.user.is_authenticated
        elif view.action  in ['update', 'partial_update']:
            return True
        elif view.action in ['create', 'destroy']:
            return request.user.is_superuser
        else:
            return False

    def has_object_permission(self, request, view, obj):
        print('*'*50)
        # Deny actions on objects if the user is not authenticated
        if not request.user.is_authenticated:
            return False
        elif view.action in ['list','update', 'partial_update']:
            return True
        elif view.action in  ['create','destroy']:
            return request.user.is_superuser
        else:
            return False
