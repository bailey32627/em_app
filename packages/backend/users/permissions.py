from rest_framework.permissions import BasePermission

def is_org_admin( user ):
    return getattr( user, 'is_organization_admin', False )


def can_admin_division( user, division ):
    if is_org_admin( user ):
        return True
    return division in user.admin_divisions.all()


def can_admin_facility( user, facility ):
    if is_org_admin( user ):
        return True
    return facility in user.admin_facilities.all()


def is_member_of_division( user, division ):
    if can_admin_division( user, division ):
        return True
    return division in user.member_divisions.all()


def is_member_of_facility( user, facility ):
    if can_admin_facility( user, facility ):
        return True
    return facility in user.member_facilities.all()



class IsOrganizationAdmin( BasePermission ):
    """
    Allows access only to the user who owns the organization
    """
    def has_permission( self, request, view ):
        user = request.user
        return user.is_authenticated and is_org_admin( request.user )


class IsDivisionAdmin( BasePermission):
    message = "User must be an organization admin or Division admin."

    def has_object_permission( self, request, view, obj ):
        return can_admin_division( request.user, obj )


class IsFacilityAdmin( BasePermission ):
    message = "User must be an Organization admin or Facility admin."

    def has_object_permission( self, request, view, obj ):
        return can_admin_facility( request.user, obj )
