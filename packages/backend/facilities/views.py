from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Facility
from divisions.models import Division
from .serializers import FacilitySerializer
from users.permissions import IsOrganizationAdmin
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
# Create your views here.

class CreateFacilityView( APIView ):
    permission_classes = [ permissions.IsAuthenticated ]

    def post( self, request ):
        division_id = request.data.get( 'division' )
        if not division_id:
            return Response( {"detail": "Division ID is required."}, status=status.HTTP_400_BAD_REQUEST )

        division = get_object_or_404( Division, id=division_id)
        organization = division.organization

        #check if use is the admin of the organization
        if request.user != organization.owner:
            raise PermissionDenied( "Only the organization admin can crate facilities" )

        #Create the facility
        fac = Facility.object.create(
            name = request.data.get( 'name' ),
            division=division,
            address = request.data.get('address' )
        )
