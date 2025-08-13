from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .models import User
from django.db.models import Prefetch
from divisions.models import Division
from facilities.models import Facility


class RegisterView( generics.CreateAPIView ):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = (
            User.objects
            .select_related('organization')
            .prefetch_related(
                Prefetch('admin_divisions', queryset=Division.objects.only('id', 'name')),
                Prefetch('member_divisions', queryset=Division.objects.only('id', 'name')),
                Prefetch('admin_facilities', queryset=Facility.objects.select_related('division').only('id', 'name', 'division__name')),
                Prefetch('member_facilities', queryset=Facility.objects.select_related('division').only('id', 'name', 'division__name')),
            )
            .get(pk=request.user.pk)
        )

        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)

#class UserView( APIView ):
#    permission_classes = [IsAuthenticated]
#
#    def get( self, request ):
#        serializer = UserSerializer( request.user )
#        return Response( serializer.data )

#class UserProfileView( APIView ):
#    permission_classes = [IsAuthenticated ]

#    def get( self, request ):
#        user = request.user
#        serializer = UserProfileSerializer( user )
#        return Response( serializer.data )
