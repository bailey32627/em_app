from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Organization
from subscriptions.models import OrganizationSubscription
from datetime import timedelta, date

@receiver( post_save, sender=Organization )
def create_default_subscription( sender, instance, created, **kwargs ):
    if created:
        OrganizationSubscription.objects.create(
            system=instance,
            facility_count=1,
            renewal_date=date.today() + timedelta( days=30 )
