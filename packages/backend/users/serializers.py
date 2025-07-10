from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'organization' ]


class RegisterSerializer( serializers.ModelSerializer ):
    password = serializers.CharField( write_only=True )

    class Meta:
        model = User;
        fields = [ 'id', 'username', 'password', 'email', 'organization' ]

        def create( self, validated_data ):
            user = User.objects.create_user(
                username=validated_data[ 'username' ],
                password = validated_data[ 'password' ],
                email = validated_data[ 'email' ],
                organization = validated_data.get[ 'organization' ],
            )
            return user
