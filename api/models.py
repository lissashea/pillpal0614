from django.db import models
from django.contrib.auth.models import User

class Medication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    medication = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    taken = models.BooleanField()

    def __str__(self):
        return self.medication
