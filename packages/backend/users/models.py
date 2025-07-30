from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class User(AbstractUser):
    organization = models.ForeignKey("organizations.Organization", on_delete=models.SET_NULL, null=True, blank=True, related_name='users' )
    division = models.ForeignKey("divisions.Division", on_delete=models.SET_NULL, null=True, blank=True)
    facility = models.ForeignKey("facilities.Facility", on_delete=models.SET_NULL, null=True, blank=True)

    is_organization_admin = models.BooleanField(default=False)
    is_division_admin = models.BooleanField(default=False)
    is_facility_admin = models.BooleanField(default=False)

    # extra fields

    def __str__(self):
        return self.username

    def get_division(self):
        return self.facility.division if self.facility else None

    def get_organization(self):
        if self.organization:
            return self.organization
        division = self.get_division()
        return division.organization if division else None

#check these flags in views or permissions logic:
#if request.user.is_system_admin:
    # Show system dashboard
#elif request.user.is_division_admin:
    # Show division overview
#elif request.user.is_facility_admin:
    # Show org tools
