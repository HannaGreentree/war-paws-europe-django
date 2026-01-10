from django.shortcuts import render
from .models import Shelter

# This function gets all shelters and sends them to the HTML page
def shelter_list(request):
    shelters = Shelter.objects.all()
    return render(request, 'shelters/shelter_list.html', {'shelters': shelters})