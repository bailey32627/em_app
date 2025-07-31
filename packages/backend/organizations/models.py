from django.db import models
from django.conf import settings
from facilities.models import Facility

# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=255)

    owner = models.ForeignKey( "users.User", on_delete=models.CASCADE, related_name='owned_organization' )
    created_by = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='created_organization' )

    created_at = models.DateTimeField(auto_now_add=True)

    stripe_customer_id = models.CharField( max_length=255, blank=True, null=True )
    stripe_subscription_id = models.CharField( max_length=255, blank=True, null=True )
    stripe_price_id = models.CharField( max_length=255, blank=True, null=True )

    def get_facility_count(self):
        return Facility.objects.filter( division__organization=self).count()

    def __str__(self):
        return self.name
