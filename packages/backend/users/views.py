from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterSerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .models import User


class RegisterView( generics.CreateAPIView ):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class UserView( APIView ):
    permission_classes = [IsAuthenticated]

    def get( self, request ):
        serializer = UserSerializer( request.user )
        return Response( serializer.data )

class UserProfileView( APIView ):
    permission_classes = [IsAuthenticated ]

    def get( self, request ):
        user = request.user
        serializer = UserProfileSerializer( user )
        return Response( serializer.data )
