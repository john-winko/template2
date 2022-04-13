from django.contrib import admin
from django.urls import path, include
from app.views import send_the_homepage, set_csrf_token, CheckAuth

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', send_the_homepage),  # This is added here instead of app/urls.py since we will use ViewSets in the app
    path('v1/', include("app.urls")),
    path('api/csrf/', set_csrf_token),
    path('api/check/', CheckAuth.as_view(), name="check")
]