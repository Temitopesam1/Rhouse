from django.db import models
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

# Create your models here.

# class User(AbstractUser):
#     pass


    
# class CustomerImage(models.Model):
#     customer = models.OneToOneField(Customer, on_delete=models.CASCADE)
#     profile_image = models.ImageField(upload_to='images/profile/%Y%M%D')


class Apartment(models.Model):
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
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='apartments')
    price = models.DecimalField(max_digits=19, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add = True, auto_now = False)

class Land(models.Model):
    size = models.CharField(max_length=100)
    location = models.CharField(max_length=500)
    description = models.TextField(max_length=1000)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lands')
    price = models.DecimalField(max_digits=19, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add = True, auto_now = False)

class ApartmentImage(models.Model):
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name='apartment_images')
    image = models.ImageField(upload_to='images/apartment/%Y%M%D')
    created_at = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)

class LandImage(models.Model):
    land = models.ForeignKey(Land, on_delete=models.CASCADE, related_name='land_images')
    image = models.ImageField(upload_to='images/land/%Y%M%D')
    created_at = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)
