from django.contrib import admin
from .models import Hazard, HazardAssessment

# Register your models here.
admin.site.register( Hazard )
admin.site.register( HazardAssessment )
