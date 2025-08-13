from django.db import models

# Create your models here.
class Division( models.Model ):
    organization = models.ForeignKey( "organizations.Organization", related_name='divisions', on_delete=models.CASCADE )
    name = models.CharField( max_length=255 )

    class Meta:
        unique_together = ( 'organization', 'name' )
        ordering = ['name']

    def __str__(self):
        return f"{self.organization.name} / {self.name}"
