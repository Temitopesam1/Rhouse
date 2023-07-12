from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import  Response
from rest_framework.views import APIView
from .utils import get_tokens_for_user
from .serializers import *
from .models import *
from .permissions import IsOwnerOrReadOnly
# Create your views here.


class ApartmentList(APIView):
    """
    List all apartments, or create a new apartment.
    """
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


    def get(self, request, format=None):
        apartments = Apartment.objects.all()
        serializer = ApartmentSerializer(apartments, many=True)
        return Response(serializer.data)
    
    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user.id)

    def post(self, request, format=None):
        data = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'location': request.data.get('location'),
            'price': request.data.get('price'),
            'creator': request.user.id
        }
        serializer = ApartmentSerializer(data=data)
        print(request.data, request.user.id)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
class ApartmentDetail(APIView):
    """
    Retrieve, update or delete an apartment instance.
    """
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

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
        serializer = ApartmentSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LandList(APIView):
    """
    List all lands, or create a new land.
    """
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.id)

    def get(self, request, format=None):
        lands = Land.objects.all()
        serializer = LandSerializer(lands, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        serializer = LandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    
class LandDetail(APIView):
    """
    Retrieve, update or delete a land instance.
    """
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

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
        serializer = LandSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegistrationView(APIView):
    permission_classes = [AllowAny, ]
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      
class LoginView(APIView):
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
    def post(self, request):
        logout(request)
        return Response({'msg': 'Successfully Logged out'}, status=status.HTTP_200_OK)


      
class ResetPasswordView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]

    def post(self, request):
        serializer = PasswordResetSerializer(context={'request': request}, data=request.data)
        serializer.is_valid(raise_exception=True) #Another way to write is as in Line 17
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)