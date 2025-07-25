import re
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'organization' ]



class RegisterSerializer( serializers.ModelSerializer ):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This username is already taken.")]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already registered.")]
    )
    password = serializers.CharField( write_only=True )

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'organization']

    def validate_password( self, value: str ):
        #minimum length
        if len(value) < 8:
            raise serializers.ValidationError( "Password must be at least 8 characters long." )
        # At least one special character
        if not re.search( r"[!@#$%^&*(),.?\":{}|<>]", value ):
            raise serializers.ValidationError( "Password must contain at least one special character." )
        # At least one uppercase letter
        if not re.search( r"\d", value ):
            raise serializers.ValidationError( "Password must contain at least one number." )
        return value


    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            organization=validated_data.get('organization', ''),
        )
        return user
