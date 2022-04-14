from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from .serializers import UserSerializer


def send_the_homepage(request):
    homepage = open('build/index.html').read()
    return HttpResponse(homepage)


# /v1/user/
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def whoami(self, request, pk=None):
        if request.user.is_authenticated:
            return JsonResponse({"user": "d"})
        return JsonResponse({"user": None})
