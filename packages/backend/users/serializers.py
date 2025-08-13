import re
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import User
from facilities.models import Facility
from divisions.models import Division
from organizations.models import Organization


class FacilityNestedSerializer( serializers.ModelSerializer ):
    division = serializers.StringRelatedField()
    class Meta:
        model = Facility
        fields = ( 'id', 'name', 'division' )

class DivisionNestedSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Division
        fields = ('id', 'name' )

class OrganizationSerializer( serializers.ModelSerializer ):
    is_owner = serializers.SerializerMethodField()
    subscription_active = serializers.SerializerMethodField()
    facility_count = serializers.SerializerMethodField()
    class Meta:
        model = Organization
        fields = ('id', 'name', 'is_owner', 'subscription_active', 'facility_count' )

    def get_is_owner( self, obj ):
        request = self.context.get( 'request' )
        if request:
            return obj.owner == request.user
        return False

    def get_subscription_active( self, obj ):
        return bool( obj.stripe_subscription_id )

    def get_facility_count( self, obj ):
        return Facility.objects.filter( division__organization=obj).count()


class UserSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer()
    admin_divisions = DivisionNestedSerializer( many=True )
    admin_facilities = FacilityNestedSerializer( many=True )
    member_divisions =  DivisionNestedSerializer( many=True )
    member_facilities =  FacilityNestedSerializer( many=True )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'fullname',
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
        if not re.search( r"[A-Z]", value ):
            raise serializers.ValidationError( "Password must contain at least one uppercase letter." )
        #At Least one number
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
