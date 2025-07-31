from django.db import models
from django.conf import settings

# Create your models here.
class Hazard( models.Model ):
    name = models.CharField( max_length=255 )
    description = models.TextField( blank=True )

    #null = global hazard. Non-null = user-defined for a specific facility
    facility = models.ForeignKey( "facilities.Facility", on_delete=models.CASCADE, related_name='custom_hazards', null=True, blank=True )

    create_by = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True )

    def __str__(self):
        return self.name

    @property
    def is_global( self ):
        return self.facility is None


class HazardAssessment( models.Model ):
    facility = models.ForeignKey( "facilities.Facility", on_delete=models.CASCADE, related_name='hazard_assessments' )
    hazard = models.ForeignKey( Hazard, on_delete=models.CASCADE, related_name='assessments' )

    # risks
    probability = models.PositiveSmallIntegerField( help_text="1-5 scale" )
    human_impact = models.PositiveSmallIntegerField( help_text="1-5 scale" )
    infrastructure_impact = models.PositiveSmallIntegerField( help_text="1-5 scale" )
    operational_impact = models.PositiveSmallIntegerField( help_text="1-5 scale" )

    #mitiagtion
    preparedness = models.PositiveSmallIntegerField( help_text="1-5 scale" )
    training = models.PositiveSmallIntegerField( help_text="1-5 scale" )
    internal_response = models.PositiveSmallIntegerField( help_text="1-5 scale" )
    external_response = models.PositiveSmallIntegerField( help_text="1-5 scale" )
    recovery_timeline = models.PositiveSmallIntegerField( help_text="1-5 scale" )

    @property
    def risk_percent( self ):
        MAX_SCORE_PER_FIELD = 5
        risk_fields = [
            self.probability,
            self.human_impact,
            self.infrastructure_impact,
            self.operational_impact,
        ]
        mitigation_fields = [
            self.preparedness,
            self.training,
            self.internal_response,
            self.external_response,
            self.recovery_timeline,
        ]

        risk_score = sum( risk_fields )
        mitigation_score = sum( mitigation_fields )

        risk_normalized = risk_score / ( len( risk_fields ) * MAX_SCORE_PER_FIELD )
        mitigation_normalized = mitigation_score / len( mitigation_fields ) * MAX_SCORE_PER_FIELD

        adjusted_risk = risk_normalized * ( 1 - mitigation_normalized )
        return round( adjusted_risk * 100, 2 )

    notes = models.TextField( blank=True )

    assessed_at = models.DateTimeField( auto_now_add=True )


    class Meta:
        unique_together = ( 'facility', 'hazard' )

    def total_score( self ):
        return self.likelihood + self.impact + self.preparedness + self.response_capability

    def __str__(self):
        return f"{self.facility.name} - {self.hazard.name}"
