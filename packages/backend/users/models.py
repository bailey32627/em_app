from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class User(AbstractUser):
    #user can only be part of one organization
    organization = models.ForeignKey("organizations.Organization", on_delete=models.PROTECT, null=True, blank=True, related_name='users' )

    #divisions and facilities the user can access
    member_divisions = models.ManyToManyField("divisions.Division", blank=True, related_name='member_divisions')
    member_facilities = models.ManyToManyField("facilities.Facility", blank=True, related_name='member_facilities')

    #divisions and facilities the user is the admin of
    admin_divisions = models.ManyToManyField( "divisions.Division", blank=True, related_name='admin_divisions' )
    admin_facilities = models.ManyToManyField( "facilities.Facility", blank=True, related_name='admin_facilities' )

    is_organization_admin = models.BooleanField(default=False)
    is_division_admin = models.BooleanField(default=False)
    is_facility_admin = models.BooleanField(default=False)

    #remove inherited first_name and last_name
    first_name = None
    last_name = None

    fullname = models.CharField( max_length=255 )


    def get_accessible_facilities( self ):
        if self.is_organization_admin:
            return Facility.objects.filter( division__organization=self.organization )
        return self.admin_facilities.all() | self.member_facilities.all()


    def get_accessible_divisions( self ):
        if self.is_organization_admin:
            return Division.objects.filter( organization=self.organization )
        return self.admin_divisions.all() | self.member_divisions.all()


    def is_admin_of_facility( self, facility ):
        if self.is_organization_admin:
            return True
        return self.admin_facilities.filter( pk=facility.pk).exists()
