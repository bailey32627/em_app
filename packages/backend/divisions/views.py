from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

# Create your views here.
from .models import Division
from organizations import Organization
from .serializers import DivisionSerializer

class CreateDivisionView( APIView ):
    permission_classes[ IsAuthenticated ]

    def post( self, request ):
        org_id = request.data.get( 'organization' )
        name = request.data.get( 'name' )

        if not org_id or not name:
            return Response( {'detail':'Organization ID and name are required'}, status=status.HTTP_400_BAD_REQUEST )

        organization = get_object_or_404( Organization, id=org_id)

        #check if the user is the organization admin
        if request.user != organization.owner:
            raise PermissionDenied( "Only the organization admin can create division." )

        division = Division.objects.create( name=name, organization=organization )

        serializer = DivisionSerializer( division )
        return Response( serializer.data, status=status.HTTP_201_CREATED )
