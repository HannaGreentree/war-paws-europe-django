from django.db import models
from django.contrib.auth.models import User

class Shelter(models.Model):
 
    TYPE_CHOICES = (
        ('shelter', 'Animal Shelter'),
        ('vet', 'Veterinary Clinic'),
        ('transport', 'Transport Company'),
    )

    COUNTRY_CHOICES = (
        ('UA', 'Ukraine'),
        ('PL', 'Poland'),
        ('RO', 'Romania'),
        ('SK', 'Slovakia'),
        ('MD', 'Moldova'),
        ('UK', 'United Kingdom'),
    )

    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=2, choices=COUNTRY_CHOICES, default='UA')
    org_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='shelter')
    website = models.URLField(blank=True)
    description = models.TextField()
    
    # Who added this?
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.city})"
    




    