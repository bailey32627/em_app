from django.urls import path
from .views import CreateInvitationView, AcceptInvitationView

urlpatterns = [
    path( 'send/', CreateInvitationView.as_view(), name='send-invitation' ),
    path( 'accept/', AcceptInvitationView.as_view(), name='accept-invitation' ),
]
