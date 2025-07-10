from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    organization = models.CharField(max_length=255, blank=True, null=True)
#    is_org_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username
