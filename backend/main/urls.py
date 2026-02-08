from django.urls import path, include
from . import views

urlpatterns = [
    path("index", views.home, name="home"),
    path("documents/", views.documents, name="documents"),
    path("shelters/", views.shelters, name="shelters"),
    path("blog/", include("blog.urls")),
    path("contact/", views.contact, name="contact"),
]