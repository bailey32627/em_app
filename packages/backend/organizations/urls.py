from django.urls import path
from .views import ManageOrganizationView, CreateOrganizationView

urlpatterns = [
    path( 'organization/create/', CreateOrganizationView.as_view(), name='create_organization'),
    path( 'organization/manage/', ManageOrganizationView.as_view(), name='organization_manage')
]
