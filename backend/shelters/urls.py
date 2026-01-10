from django.urls import path
from . import views

urlpatterns = [
    # When user goes to /shelters/, show the list
    path('', views.shelter_list, name='shelter_list'),
]