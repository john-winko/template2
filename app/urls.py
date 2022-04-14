from rest_framework.routers import DefaultRouter
from .views import send_the_homepage, UserViewSet
from django.urls import path, include

r = DefaultRouter()
r.register(r'user', UserViewSet)

urlpatterns = r.urls


urlpatterns = [
    path(r'api/v1/', include('djoser.urls')),
    path(r'api/v1/', include('djoser.urls.authtoken')),
    path('', send_the_homepage),
    path('v1/', include(r.urls))
]
