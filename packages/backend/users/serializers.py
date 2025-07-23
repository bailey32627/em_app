from rest_framework.validators import UniqueValidator
from rest_framework import serializers
<<<<<<< HEAD

=======
from rest_framework.validators import UniqueValidator
>>>>>>> main
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'organization' ]


<<<<<<< HEAD
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Email already in use.")]
    )
    password = serializers.CharField(write_only=True)
=======
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
>>>>>>> main

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'organization']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            organization=validated_data.get('organization', ''),
        )
        return user
