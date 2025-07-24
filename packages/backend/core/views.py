from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['GET'])
def check_username(request):
    username = request.query_params.get('username', '')
    if not username:
        return Response({'available': False, 'message': 'No username provided'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'available': False, 'message': 'Username already taken'})
    else:
        return Response({'available': True, 'message': 'Username is available'})

@api_view(['GET'])
def check_email(request):
    email = request.query_params.get( 'email', '' )
    if not email:
        return Response( {'available': False, 'message': 'Valid email must be provided.'}, status=400)

    if User.objects.filter( email=email ).exists():
        return Response({'available': False, 'message': 'Email address is already in use' } )
    else:
        return Response({'available': True, 'message': 'Email is available' } )
