from rest_framework import permissions

class IsOrganizationAdmin( permissions.BasePermission ):
    """
    Allows access only to the user who owns the organization
    """
    def has_permission( self, request, view ):
        user = request.user
        return user.is_authenticated and hasattr( user, 'organization_owner' )

# use like
# from users.permissions import can_invite
