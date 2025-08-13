from rest_framework import serializers
from .models import Division

class DivisionSerializer( serializers.ModelSerializer ):
    
    class Meta:
        model = Division
        fields = [ 'id', 'name' ]

    def validate( self, data ):
        org = self.context[ 'request'].user.organization
        name = data.get( "name" )

        if Division.objects.filter( organization=org, name__iexact=name).exists():
            raise serializers.ValidataionError( {
                'name': 'A division with this name already exists in your organization.'
            })
        return data


    def create( self, validated_data ):
        user = self.context[ 'request' ].user
        org = user.organization
        division = Division.objects.create( organization=org, **validated_data )
        user.admin_divisions.add( division)
        return division
