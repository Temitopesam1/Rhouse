from django.urls import path
from .views import *
from rest_framework_simplejwt import views as jwt_views

app_name = 'users'

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token-refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('apartments/', ApartmentList.as_view()),
    path('apartments/<int:pk>/', ApartmentDetail.as_view()),
    path('lands/', LandList.as_view()),
    path('lands/<int:pk>/', LandDetail.as_view()),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('reset-password/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]