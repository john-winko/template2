from rest_framework.routers import DefaultRouter
from .views import send_the_homepage, UserViewSet
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

r = DefaultRouter()
r.register(r'user', UserViewSet)

urlpatterns = r.urls


urlpatterns = [
    path('v1/api/token/access/', TokenRefreshView.as_view(), name='token_get_access'),
    path('v1/api/token/both/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', send_the_homepage),
    path('v1/', include(r.urls))
]
