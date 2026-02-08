from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),   # homepage
    path("documents/", views.documents, name="documents"),
    path("shelters/", views.shelters, name="shelters"),
    path("contact/", views.contact, name="contact"),
]
