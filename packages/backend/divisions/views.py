from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, permissions

# Create your views here.
from .serializers import DivisionSerializer
from .models import Division
from django.contrib.auth import get_user_model

User = get_user_model()

class CreateDivisionView( APIView ):
    permission_classes = [ IsAuthenticated ]

    def post( self, request ):
        serializer = DivisionSerializer( data=request.data, context={'request': request} )

        if serializer.is_valid():
            division = serializer.save()
            return Response( DivisionSerializer(division).data, status = status.HTTP_201_CREATED)

        return Response( serializer.errors, status = status.HTTP_400_BAD_REQUEST )


class DeleteDivisionView( APIView ):
    permission_classes = [ IsAuthenticated ]

    def delete( self, request, pk ):
        try:
            division = Division.objects.get( pk=pk )
        except Division.DoesNotExist:
            return Response( {"error": "Division not found" }, status=status.HTTP_404_NOT_FOUND)

        #Remove this division from all related users
        for user in User.objects.filter( member_divisions=division):
            user.member_divisions.remove( division )

        #Remove this division form all admin_divisions relations
        for user in User.objects.filter( admin_divisions=division):
            user.admin_divisions.remove( division )

        #Finally delete the division
        division.delete()
        return Response( {"message": "Division deleted"}, status=status.HTTP_204_NO_CONTENT)
