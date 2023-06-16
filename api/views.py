from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import MedicationSerializer, UserSerializer
from .models import Medication
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied, NotFound
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
import jwt
from rest_framework.generics import UpdateAPIView
from django.http import JsonResponse
from django.shortcuts import get_object_or_404


User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Create a new Medication object and associate it with the user
            medication = Medication.objects.create(user=user)

            # Generate a token for the user
            token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')

            return Response({
                'message': 'Registration successful',
                'token': token,
                'user_id': user.id,
            })

        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
class UpdateMedicationStatusView(UpdateAPIView):
    serializer_class = MedicationSerializer
    queryset = Medication.objects.all()

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
        return Response({'token': token, 'user_id': user.id, 'message': f'Welcome back {user.username}!'})


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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def patch(self, request, medication_id):
        medication = Medication.objects.get(id=medication_id, user=request.user)
        serializer = MedicationSerializer(medication, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class DeleteMedicationView(APIView):
    def delete(self, request, medication_id):
        medication = get_object_or_404(Medication, id=medication_id, user=request.user)
        medication.delete()
        return JsonResponse({'message': 'Medication deleted successfully'})