from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import NoteSerializer, UserSerializer
from .models import Note
from django.contrib.auth.models import User
from rest_framework.decorators import action


def send_the_homepage(request):
    theIndex = open('build/index.html').read()
    return HttpResponse(theIndex)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):  # noqa (used to omit lint warnings in PyCharm)
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom info to the token that can be decoded client side
        token['username'] = user.username
        token['id'] = user.pk
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def my_notes(self, request, pk=None):
        notes = request.user.notes.all()
        json_data = NoteSerializer(notes, many=True).data
        return JsonResponse(json_data, safe=False)


class NotesViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    @action(detail=False, methods=['POST'])
    def new(self, request, pk=None):
        try:
            new_note = Note(user=request.user, body=request.data["body"])
            new_note.save()
            return JsonResponse({"test": "testt"})
        except Exception as e:
            return JsonResponse({"error": "Something went wrong"}, status=500)


