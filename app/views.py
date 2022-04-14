from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
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

    @action(detail=False, methods=['post'])
    def login(self, request, pk=None):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            try:  # access the base request, not DRF request (starts a login session for user)
                login(request, user)
            except Exception as e:
                print(str(e))
            return JsonResponse({"user": self.serializer_class(user).data})
        else:
            return JsonResponse({"user": None})

    @action(detail=False, methods=['post'])
    def logout(self, request, pk=None):
        logout(request)
        return JsonResponse({"logout": "success"})

    @action(detail=False, methods=['get'])
    def whoami(self, request, pk=None):
        if request.user.is_authenticated:
            return JsonResponse({"user": self.serializer_class(request.user).data})
        return JsonResponse({"user": None})