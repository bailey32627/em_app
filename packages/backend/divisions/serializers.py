from rest_framework import serializers
from .models import Division

class DivisionSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Division
        fields = [ 'id', 'name', 'organization' ]
