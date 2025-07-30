from django.db import models
from organizations.models import Organization

# Create your models here.
class Division( models.Model ):
    organization = models.ForeignKey( Organization, related_name='division', on_delete=models.CASCADE )
    name = models.CharField( max_length=255 )

    def __str__(self):
        return f"{self.organization.name} / {self.name}"
