from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import MedicationSerializer, UserSerializer
from .models import Medication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


User = get_user_model()

# Create your views here.

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})
    

class MedicationView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Extract the token from the request's Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                # Decode the token and extract the user ID
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                user_id = decoded_token.get('sub')
                user = User.objects.get(id=user_id)

                # Filter medications by the logged-in user
                medications = Medication.objects.filter(user=user)
                serializer = MedicationSerializer(medications, many=True)
                return Response(serializer.data)

            except (jwt.DecodeError, User.DoesNotExist):
                raise PermissionDenied({'message': 'Invalid token or user not found'})

        raise PermissionDenied({'message': 'Invalid authorization header'})