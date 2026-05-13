from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password


@api_view(["POST"])
def signup(request):
    try:
        username = request.data.get("username")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        user = User.objects.create(username=username, password=make_password(password))

        return Response(
            {"message": "User created successfully", "username": user.username}
        )

    except Exception as e:
        return Response({"error": str(e)}, status=500)
