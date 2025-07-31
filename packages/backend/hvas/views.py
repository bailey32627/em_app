from rest_framework import viewsets, permissions
from .models import Hazard, HazardAssessment
from .serializers import HazardSerializer, HazardAssessmentSerializer
from .permissions import IsAdmin

# Create your views here.
class HazardViewSet( viewsets.ModelViewSet ):
    queryset = Hazard.objects.all()
    serializer_class = HazardSerializer
    permission_classes = [ IsAdmin ]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



class HazardAssessmentViewSet(viewsets.ModelViewSet):
    queryset = HazardAssessment.objects.select_related( 'hazard', 'facility' )
    serializer_class = HazardAssessmentSerializer
    permission_classes = [ IsAdmin ]

    def perform_create(self, serializer):
        user = self.request.user
        facility = serializer.validated_data.get( 'facility' )

        if not user.has_admin_access_to( 'facility' ):
            raise PermissionDenied( "You are not authorized to submit assessments for this facility" )
            
        serializer.save()
