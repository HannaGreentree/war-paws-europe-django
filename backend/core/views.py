from datetime import date
from django.shortcuts import render

WAR_START = date(2022, 2, 23)

def index(request):
    war_day_number = (date.today() - WAR_START).days
    return render(request, "main/index.html", {"war_day_number": war_day_number})

def documents(request):
    return render(request, "pages/documents.html")

def shelters(request):
    return render(request, "pages/shelters.html")

def contact(request):
    return render(request, "pages/contact.html")
