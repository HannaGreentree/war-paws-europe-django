from django.contrib import admin
from .models import Shelter

@admin.register(Shelter)
class ShelterAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'country', 'org_type')
    list_filter = ('country', 'org_type')
    search_fields = ('name', 'city')