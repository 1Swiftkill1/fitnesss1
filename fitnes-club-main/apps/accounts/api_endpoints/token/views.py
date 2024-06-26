from django.contrib.auth import authenticate
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class TokenGenerationView(APIView):
    state_param = openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "email": openapi.Schema(type=openapi.TYPE_STRING),
            "password": openapi.Schema(type=openapi.TYPE_STRING),
        },
    )

    @swagger_auto_schema(request_body=state_param)
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Perform any necessary validation or error handling here

        # Assuming validation is successful, retrieve the user object
        # based on the provided username and password
        user = authenticate(email=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)

            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Return the generated tokens as a response
            return Response({"access_token": access_token, "refresh_token": refresh_token})

        # Return an appropriate error response if authentication fails
        return Response({"error": "Invalid credentials"}, status=401)
