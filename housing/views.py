from django.contrib.auth import authenticate, login, logout
from django.http import Http404
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from .utils import get_tokens_for_user
from .serializers import *
from .models import *
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth import get_user_model
from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework import status, filters
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .signals import password_reset_signal


    
class PasswordResetView(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Trigger the signal for password reset
        password_reset_signal.send(sender=user, email=email)

        return Response({'message': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(UpdateAPIView):
    permission_classes = [IsAuthenticated, ]
    def patch(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
            return Response({'error': 'Invalid user token.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the token is valid
        if default_token_generator.check_token(user, token):
            new_password = request.data.get('new_password')
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)



class ApartmentList(APIView):
    """
    List all apartments, or create a new apartment.
    """
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


    def get(self, request):
        queryset = Apartment.objects.all()
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)
        availability = request.query_params.get('availability', None)
        location = request.query_params.get('location', None)
        title = request.query_params.get('title', None)

        if min_price and max_price:
            queryset = queryset.filter(price__range=(min_price, max_price))
        elif min_price:
            queryset = queryset.filter(price__gte=min_price)
        elif max_price:
            queryset = queryset.filter(price__lte=max_price)

        if availability:
            queryset = queryset.filter(availability=availability)
        if location:
            queryset = queryset.filter(location=location)
        if title:
            queryset = queryset.filter(title=title)

        serializer = ApartmentSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request):
        apartment_data = request.data.copy()
        images_data = apartment_data.pop('images', [])

        # Create the apartment object
        apartment_data["creator"] = request.user.id
        apartment_serializer = ApartmentSerializer(data=apartment_data)
        if apartment_serializer.is_valid():
            apartment = apartment_serializer.save()

            # Create associated images
            for image_data in images_data:
                image_data['apartment'] = apartment.id
                image_serializer = ImageSerializer(data=image_data)
                if image_serializer.is_valid():
                    image_serializer.save()
                else:
                    # If there's an error with the image data, you may decide how to handle it
                    return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(apartment_serializer.data, status=status.HTTP_201_CREATED)
        return Response(apartment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class ApartmentDetail(APIView):
    """
    Retrieve, update or delete an apartment instance.
    """
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            return Apartment.objects.get(pk=pk)
        except Apartment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ApartmentSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ApartmentSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response({"message": "Apartment entry and associated images deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class LandList(APIView):
    """
    List all lands, or create a new land.
    """
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get(self, request, format=None):
        lands = Land.objects.all()
        serializer = LandSerializer(lands, many=True)
        return Response(serializer.data)
    

    def post(self, request):
        land_data = request.data.copy()
        images_data = land_data.pop('images', [])

        # Create the land object
        land_data["creator"] = request.user.id
        land_serializer = LandSerializer(data=land_data)
        if land_serializer.is_valid():
            land = land_serializer.save()

            # Create associated images
            for image_data in images_data:
                image_data['land'] = land.id
                image_serializer = ImageSerializer(data=image_data)
                if image_serializer.is_valid():
                    image_serializer.save()
                else:
                    # If there's an error with the image data, you may decide how to handle it
                    return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(land_serializer.data, status=status.HTTP_201_CREATED)
        return Response(land_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    
class LandDetail(APIView):
    """
    Retrieve, update or delete a land instance.
    """
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            return Land.objects.get(pk=pk)
        except Land.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = LandSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = LandSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response({"message": "Land entry and associated images deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class RegistrationView(APIView):
    permission_classes = [AllowAny, ]
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.data["email"])
                return Response({"message": "Email is associated with a registered user."}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                serializer.save()
                username = request.POST['username']
                password = request.POST['password']
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    auth_data = get_tokens_for_user(request.user)
                    return Response({'msg': 'User Created Successfully!', **auth_data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      
class LoginView(APIView):
    permission_classes = [AllowAny, ]
    def post(self, request):
        if 'username' not in request.data or 'password' not in request.data:
            return Response({'msg': 'Credentials missing'}, status=status.HTTP_400_BAD_REQUEST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            auth_data = get_tokens_for_user(request.user)
            return Response({'msg': 'Login Success', **auth_data}, status=status.HTTP_200_OK)
        return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

      
class LogoutView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        logout(request)
        return Response({'msg': 'Successfully Logged out'}, status=status.HTTP_200_OK)
