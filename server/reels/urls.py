from django.urls import path
from .views import generate_script, my_scripts

urlpatterns = [
    path("generate/", generate_script),
    path("my-scripts/", my_scripts),
]
