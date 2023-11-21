from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

API_VERSION = 1
API_PATH = f'api/v{API_VERSION}'

urlpatterns = [
    path('', views.MainView.as_view(), name='main'),
    path(f'{API_PATH}/ping', views.Ping.as_view(), name="ping"),
    path(f'{API_PATH}/pingpong', views.PingPong.as_view(), name="pingpong"),
    path(f'{API_PATH}/analyze/file', views.AnalyzeFiles.as_view(), name="analyze-files"),
    path(f'{API_PATH}/analyze/user', views.AnalyzeUsers.as_view(), name="analyze-user"),
    path(f'{API_PATH}/symbols', views.GetSymbols.as_view(), name="symbols"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
