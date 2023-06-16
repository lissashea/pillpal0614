from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='profile'),

    path('register/', views.RegisterView.as_view(), name='register'),

    path('login/', views.LoginView.as_view(), name='login'),

    path('medications/<int:pk>/', views.UpdateMedicationStatusView.as_view(), name='update-medication-status'),

]
