from rest_framework import serializers
from django.utils import timezone
from users.models import User
from organizations.models import Organization
from divisions.models import Division
from facilities.models import Facility
from .models import UserInvitation, InvitationStatus

class UserInvitationSerializer( serializers.ModelSerializer ):
    email = serializers.EmailField()
    role = serializers.ChoiceField( choices=[
        ("org_admin", "Org Admin" ),
        ("division_admin", "Division Admin" ),
        ("facilty_admin", "Facility Admin" ),
        ("user", "User" ),
    ])
    organization = serializers.PrimaryKeyRelatedField( queryset=Organization.objects.all(), required=False )
    division = serializers.PrimaryKeyRelatedField( queryset=Division.objects.all(), required=False )
    facliity = serializers.PrimaryKeyRelatedField( queryset=Facility.objects.all(), required=False )

    class Meta:
        model = UserInvitation
        fields = ["email", "role", "organization", "division", "facility" ]

    def validate( self, data ):
        user = self.context[ "request" ].user
        role = data.get( "role" )
        organization = data.get("organization" )
        division = data.get( "division" )
        facility = data.get( "facility" )

        #system Admin: Can invite anyone, anywhere
        if user.is_organization_admin:
            return data

        #Division Admin
        if user.is_division_admin:
            if role == "org_admin" or role == "division_admin":
                raise serializers.ValidationError( "Division Admins cannot invite system or other division admins." )
            if not division or division != user.division:
                raise serializers.ValidationError( "You can only invite to your own division." )
            if role == "facility_admin" and not facility:
                raise serializers.ValidataionError( "Must specify facility to assign a facility admin to." )
            if facility and facility.division != user.division:
                raise serializers.ValidataionError( "Facility must belong to your division." )
            return data

        #facility admin
        if user.is_facility_admin:
            if role != "user":
                raise serializers.ValidataionError( "Facility admins can only invite users." )
            if not facility or facility != user.facility:
                raise serializers.ValidationError( "You can only invite to your own facility." )
            return data

        raise serializers.ValidataionError( "You are not allowed to send invitations." )
