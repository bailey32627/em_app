from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import UserInvitation, InvitationStatus
from .serializers import UserInvitationSerializer
from users.models import User

UserModel = get_user_model()

#Admin sends an invitation
class CreateInvitationView( generics.CreateAPIView ):
    serializer_class = UserInvitationSerializer
    permission_class = [ IsAuthenticated ]

    def perform_create( self, serializer ):
        #set the expiration date, 7 days from now
        expires = timezone.now() + timezone.timedelta(days=7)

        serializer.save(
            invited_by=self.request.user,
            status=InvitationStatus.PENDING,
            expires_at=expires
        )


#User accepts invitation
class AcceptInvitationView( generics.GenericAPIView ):
    serializer_class = UserInvitationSerializer

    def post( self, request, *args, **kwargs ):
        token = request.data.get( "token" )
        user = request.user

        try:
            invitation = UserInvitation.objects.get( token=token, status=InvitationStatus.PENDING )
        except UserInvitation.DoesNotExist:
            return Response( {"detail": "Invalid or expired invitation." }, status=status.HTTP_400_BAD_REQUEST )

        if invitation.is_expired():
            invitation.status = InvitationStatus.EXPIRED
            invitation.save()
            return Response( {"detail": "Invitation has expired" }, status=status.HTTP_400_BAD_REQUEST )

        #assign uer to entities
        user.system = invitation.system or user.system
        user.division = invitation.division or user.division
        user.facility = invitation.facility or user.facility

        #optionally assign role
        if invitation.role == "division_admin":
            user.is_division_admin = True
        elif invitation.role == "facility_admin":
            user.is_facility_admin = True
        #add other roles if needed

        user.save()

        invitation.status = InvitationStatus.ACCEPTED
        invitation.save()

        return Response( {"detail": "Invitation accepted successfully."}, status=status.HTTP_200_OK )
