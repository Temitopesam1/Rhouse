from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

class Customer(AbstractBaseUser):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=8)
    profile_image = models.ImageField(upload_to='images/profile/%Y%M%D')

class Realtor(AbstractBaseUser):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=8)
    profile_image = models.ImageField(upload_to='images/profile/%Y%M%D')




class Apartments(models.Model):
    TITLE_CHOICES = [
        ('Self_Contain', 'Self_Contain'),
        ('Two_Bed', 'Two_Bed'),
        ('Three_Bed', 'Three_Bed'),
        ('Four_Bed', 'Four_Bed'),
        ('Five_Bed', 'Five_Bed'),
    ]
    title = models.CharField(max_length=12, choices=TITLE_CHOICES, default=TITLE_CHOICES[0])
    location = models.CharField(max_length=500)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=19, decimal_places=2)

class Lands(models.Model):
    size = models.CharField(max_length=100)
    location = models.CharField(max_length=500)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=19, decimal_places=2)

class ApartmentImage(models.Model):
    apartments = models.ForeignKey(Apartments, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/apartment/%Y%M%D')

class LandImage(models.Model):
    lands = models.ForeignKey(Lands, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/land/%Y%M%D')
