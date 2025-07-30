from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from organizations.models import Organization
from divisions.models import Division
from facilities.models import Facility

# Create your views here.
class CreateFacilityView( APIView ):
    def post( self, request ):
        division_id = request.data.get( 'division' )
        division = Division.Objects.get( id=division_id)
        organization = division.organization
        subscription = system.subscription

        if not subscription.is_with_limit():
            return Response(
                {"error": "Facility limit reached for this system's subscription" },
                status=status.HTTP_403_FORBIDDEN
            )

        #proceed to create the org...
        fac = Facilities.objects.create(
            name=request.data.get( 'name' ),
            division=division
        )
        return Response( {"success": True, "facility_id": fac.id}, status=status.HTTP_201_CREATED )
