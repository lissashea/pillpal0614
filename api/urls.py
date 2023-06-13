from django.urls import path
from . import views

urlpatterns = [
    path('medication-list/', views.MedicationView.as_view(), name='medication_list'),

    path('register/', views.RegisterView.as_view(), name='register'),
    
    path('login/', views.LoginView.as_view(), name='login'),
]
