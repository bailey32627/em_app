from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import stripe

from divisions.models import Division
from facilities.models import Facility
from users.permissions import IsOrganizationAdmin

# Create your views here.

from .models import Organization
from users.models import User

class CreateOrganizationView(APIView):
    permission_classes = [ IsAuthenticated ]

    def post( self, request ):
        name = request.data.get( "name" )
        if not name:
            return Response( {"error": "Organization name is required" }, status=400 )

        #Create the org
        org = Organization.objects.create( name=name, owner=request.user, created_by=request.user )

        #make user the admin and assign to org
        user = request.user
        user.organization = org
        user.is_organization_admin = True
        user.save()

        return Response( {
            "message": "Organization created successfully",
            "organization": {
                "id": org.id,
                "name": org.name,
            }
        }, status = status.HTTP_201_CREATED )


class ManageOrganizationView( APIView ):
    permission_classes = [ IsAuthenticated, IsOrganizationAdmin ]

    def get( self, request ):
        org = request.user.organization
        divisions = org.divisiions.prefetch_related( 'facilities').all()
        return Response( {
            "organization": {
                "id": org.id,
                "name": org.name,
                "stripe_subscription_id": org.stripe_subscription_id,
            },
            "divisions": [
                {
                    "id": div.id,
                    "name": div.name,
                    "facilities": [
                        { "id": f.id, "name": f.name }
                        for f in div.facilities.all()
                    ],
                }
                for div in divisions
            ],
        })
