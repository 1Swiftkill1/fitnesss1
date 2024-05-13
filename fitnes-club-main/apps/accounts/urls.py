from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from apps.accounts.views import (AccountRegisterView, RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView,  \
                                 LoginAPIView, UpdatePassword, UserList, UserUpdateView, ProfileView,UserDeleteView)

from .api_endpoints import TokenGenerationView

app_name = "user"

urlpatterns = [
    path("register/", AccountRegisterView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path('update-password/',UpdatePassword.as_view()),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete'),
    path("Token", TokenGenerationView.as_view(), name="Token"),
    path("TokenRefresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("TokenVerify", TokenVerifyView.as_view(), name="token_verify"),
    path("UserList", UserList.as_view(), name="user-list"),
    path("profile/<str:email>/", ProfileView.as_view(), name="profile"),
    path("update/profile/<str:email>/", UserUpdateView.as_view(), name="update"),
    path('delete-user/',UserDeleteView.as_view())
]

