from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Medication

class MedicationInline(admin.TabularInline):
    model = Medication

class CustomUserAdmin(UserAdmin):
    inlines = [MedicationInline]

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
