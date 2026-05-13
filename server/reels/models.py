from django.contrib.auth.models import User
from django.db import models


class ReelScript(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    niche = models.CharField(max_length=255)
    platform = models.CharField(max_length=100)
    style = models.CharField(max_length=100)

    title = models.TextField()
    hook = models.TextField()
    script = models.TextField()
    cta = models.TextField()
    hashtags = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
