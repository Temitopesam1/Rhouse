from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    apartments = serializers.PrimaryKeyRelatedField(many=True, queryset=Apartment.objects.all())
    lands = serializers.PrimaryKeyRelatedField(many=True, queryset=Land.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'apartments', 'lands']


class ApartmentSerializer(serializers.ModelSerializer):
    # creator = serializers.ReadOnlyField(source='creator.id')
    class Meta:
        model = Apartment
        fields = ["title", "description", "created_at", "price", "creator", "location"]


class LandSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model = Land
        fields = ["size", "description", "created_at", "price", "creator", "location"]

class ApartmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentImage
        fields = '__all__'

class LandImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandImage
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(email=self.validated_data['email'], username=self.validated_data['username'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(style={"input_type": "password"}, required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError({'current_password': 'Does not match'})
        return value