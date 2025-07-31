from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

# Create your models here.
class Facility( models.Model ):
    division = models.ForeignKey( "divisions.Division", related_name='facilities', on_delete=models.CASCADE )
    name = models.CharField( max_length=255 )
    address = models.TextField( blank=True, null=True )

    def __str__(self):
        return f"{self.division.system.name} / {self.division.name} / {self.name}"
