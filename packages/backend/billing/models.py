from django.db import models
from django.conf import settings

# Create your models here.

class Subscription( models.Model ):
    user = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete=models.CASCADE )
    stripe_customer_id = models.CharField( max_length=255 )
    stripe_subscription_id = models.CharField( max_length=255 )
    active = models.BooleanField( default=True )
    created_at = models.DateTimeField( auto_now_add=True )
