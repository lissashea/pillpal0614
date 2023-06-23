from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('medications/<int:medication_id>/', views.DeleteMedicationView.as_view(), name='medication-delete'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('medications/update/<int:pk>/', views.UpdateMedicationStatusView.as_view(), name='update-medication-status'),
]
