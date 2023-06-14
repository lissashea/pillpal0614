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
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

# Create your views here.


class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Create a new Medication object and associate it with the user
            medication = Medication.objects.create(user=user)

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

        token = jwt.encode(
            {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'user_id': user.id, 'message': f'Welcome back {user.username}!'})


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        medications = Medication.objects.filter(user=request.user)
        serializer = MedicationSerializer(medications, many=True)
        profile_data = serializer.data
        profile_data_with_username = []

        for data in profile_data:
            user_id = data['user']
            user = User.objects.get(id=user_id)
            username = user.username
            data['username'] = username
            profile_data_with_username.append(data)

        return Response(profile_data_with_username)

    def post(self, request):
        serializer = MedicationSerializer(data=request.data)
        if serializer.is_valid():
            medication = serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=422)
