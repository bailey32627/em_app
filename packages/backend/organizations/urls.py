from django.urls import path
from .views import ManageOrganizationView

urlpatterns = [
    path( 'api/organization/manage/', ManageOrganizationView.as_view(), name='organization_manage')
]
