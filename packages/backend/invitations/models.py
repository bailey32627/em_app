from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.crypto import get_random_string

# Create your models here.

class InvitationStatus( models.TextChoices ):
    PENDING = 'pending', 'Pending'
    ACCEPTED = 'accepted', 'Accepted'
    EXPIRED = 'expired', 'Expired'
    CANCELED = 'canceled', 'Canceled'


class UserInvitation( models.Model ):
    email = models.EmailField()
    invited_by = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_invitations' )

    organization = models.ForeignKey( 'organizations.Organization', null=True, on_delete=models.CASCADE )
    division = models.ForeignKey( 'divisions.Division', null=True, on_delete=models.CASCADE )
    facility = models.ForeignKey( 'facilities.Facility', null=True, on_delete=models.CASCADE )

    role = models.CharField( max_length=50, blank=True ) #optional, could be 'division_admin, etc'

    token = models.CharField( max_length=64, unique=True, default=get_random_string )
    status = models.CharField( max_length=20, choices=InvitationStatus.choices, default=InvitationStatus.PENDING )
    created_at =models.DateTimeField( auto_now_add=True )
    expires_at = models.DateTimeField()

    def is_expired( self ):
        return timezone.now > self.expires_at
