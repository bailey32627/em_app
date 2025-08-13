from django.urls import path
from .views import CreateDivisionView, DeleteDivisionView

urlpatterns = [
    path( 'divisions/create/', CreateDivisionView.as_view(), name='division'),
    path( 'divisions/<int:pk>/delete/', DeleteDivisionView.as_view(), name='delete-division' ),
]
