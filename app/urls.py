from django.urls import path, include
from .views import MyTokenObtainPairView, UserViewSet, NotesViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

r = DefaultRouter()
r.register(r'user', UserViewSet, basename="user")
r.register(r'note', NotesViewSet, basename="note")

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('v1/', include(r.urls))
]
