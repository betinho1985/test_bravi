from django.conf.urls import url, include
from rest_framework import routers
from chess.knightmoves import views
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'moves', views.MoveViewSet, base_name='moves')
urlpatterns = router.urls


urlpatterns = [
    url(r'^gateway/', include(router.urls)),
    url(r'^gateway/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
