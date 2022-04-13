from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        # NOTE: can only use fields or excludes, not both

        # Stricter access
        # fields = ["id", "username", "last_login"]

        # Open access
        exclude = ["password"]
