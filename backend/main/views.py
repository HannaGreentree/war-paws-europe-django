from django.shortcuts import render

def home(request):
    return render(request, "main/index.html")

def documents(request):
    return render(request, "main/documents.html")

def shelters(request):
    return render(request, "main/shelters.html")

def blog(request):
    return render(request, "main/blog.html")

def contact(request):
    return render(request, "main/contact.html")

