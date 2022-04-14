from django.contrib import admin
from django.urls import path, include
from app.views import send_the_homepage
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', send_the_homepage),  # This is added here instead of app/urls.py since we will use ViewSets in the app
    path('v1/', include("app.urls")),
    path("token/", TokenObtainPairView.as_view(), name="obtain_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
]