from rest_framework import serializers
from .models import HazardAssessment, Hazard


class HazardSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Hazard
        fields = [ 'id', 'name', 'description' ]

class HazardAssessmentSerializer(serializers.ModelSerializer):
    risk_percent = serializers.SerializerMethodField()

    class Meta:
        model = HazardAssessment
        fields = [
            'id',
            'name',
            'probability',
            'human_impact',
            'infrastructure_impact',
            'operational_impact',
            'preparedness',
            'training',
            'internal_response',
            'external_response',
            'recovery_timeline',
            'risk_percent',
        ]

    def get_risk_percent(self, obj):
        return obj.risk_percent
