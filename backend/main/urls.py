from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("documents/", views.documents, name="documents"),
    path("shelters/", views.shelters, name="shelters"),
    path("blog/", views.blog, name="blog"),
    path("contact/", views.contact, name="contact"),
]
