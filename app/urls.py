from rest_framework.routers import DefaultRouter
from app.views import UserViewSet

r = DefaultRouter()
r.register(r'user', UserViewSet)

urlpatterns = r.urls
