from rest_framework.permissions import BasePermission

class IsSystemAdmin( BasePermission ):
    def has_permission( self, request, view ):
        return request.user.is_authenticated and request.user.is_system_admin

class IsDivisionAdmin( BasePermission ):
    def has_permission( self, request, view ):
        return request.user.is_authenticated and request.user.is_division_admin

class IsFacilityAdmin( BasePermission ):
    def has_permission( self, request, view ):
        return request.user.is_authenticated and request.user.is_facility_admin
        
# use like
# from users.permissions import can_invite
