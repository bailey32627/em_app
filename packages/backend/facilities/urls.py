from django.urls import path
from .views import CreateFacilityView

urlpatterns = [
    path( 'facility/', CreateFacilityView.as_view(), name='facility')
]
