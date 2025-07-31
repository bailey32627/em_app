from rest_framework import permissions

class IsAdmin( permissions.BasePermissions ):
    # Custom permissions to allow only admins to create or update hazard assessments
    def has_permission( self, request, view ):
        if request.method in permissions.SAFE_METHODS:
            return True  #anyone can read

        user = request.user
        if not user.is_authenticated:
            return False # must be a logged in

        if user.is_org_admin:
            return True

        if user.is_division_admin:
            return True

        if user.is_facility_admin:
            return True
