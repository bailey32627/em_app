from django.urls import path
from .views import CreateDivisionView

urlpatterns = [
    path( 'division/', CreateDivisionView.as_view(), name='division')
]
