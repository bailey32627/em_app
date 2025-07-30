from django.db import models

# Create your models here.
from django.db import models
from divisions.models import Division
from django.conf import settings

# Create your models here.
class Facility( models.Model ):
    division = models.ForeignKey( Division, related_name='facilities', on_delete=models.CASCADE )
    name = models.CharField( max_length=255 )
    address = models.TextField( blank=True, null=True )

    def __str__(self):
        return f"{self.division.system.name} / {self.division.name} / {self.name}"


class FacilityMembership( models.Model ):
    user = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete=models.CASCADE )
    facility = models.ForeignKey( Facility, on_delete=models.CASCADE )
    role = models.CharField( max_length=50, choices=[
        ('admin', 'Admin' ),
        ('member', 'Member' ),
    ])

    class Meta:
        unique_together = ( 'user', 'facility' )
