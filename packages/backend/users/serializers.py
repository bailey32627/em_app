import re
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    organization = serializers.StringRelatedField()
    member_divisions = serializers.StringRelatedField( many=True )
    member_facilities = serializers.StringRelatedField( many=True )
    admin_divisions = serializers.StringRelatedField( many=True )
    admin_facilities = serializers.StringRelatedField( many=True )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email', 'fullname',
            'is_organization_admin',
            'is_division_admin',
            'is_facility_admin',
            'organization',
            'member_divisions',
            'member_facilities',
            'admin_divisions',
            'admin_facilities',
          ]
        extra_kwargs = { 'password': {'write_only': True }}


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

    #optional fields
    fullname = serializers.CharField( required=False, allow_blank=True )

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'fullname' ]

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
            fullname=validated_data.get( 'fullname', ''),
        )
        return user
