from django.urls import path
from .views import HazardViewSet, HazardAssessmentViewSet

urlpatterns = [
    path('hazards/', HazardViewSet.as_view(), name='hazards'),
    path('hazard-assessments/', HazardAssessmentViewSet.as_view(), name='hazard_assessments' ),
]
