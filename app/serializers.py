from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Note


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
