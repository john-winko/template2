from django.contrib import admin
from django.urls import path, include
from app.views import send_the_homepage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', send_the_homepage), # This is added here instead of app/urls.py since we will use ViewSets in the app
    path('v1/', include("app.urls"))
]