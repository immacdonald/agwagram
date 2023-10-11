from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

API_VERSION = 1
API_PATH = f'api/v{API_VERSION}'

urlpatterns = [
    path('', views.MainView.as_view(), name='main'),
    path('analyze-user', views.AnalyzeUser.as_view(), name='analyze-user'),
    path('results', views.AnalysisResultsView.as_view(), name='results'),
    path('methodology', views.MethodologyView.as_view(), name='methodology'),
    path('analyze-file', views.AnalyzeFile.as_view(), name='analyze-file'),
    path(f'{API_PATH}/analyze/user', views.Analyze.as_view(), name='api-analyze-user'),
    path(f'{API_PATH}/ping', views.Ping.as_view(), name="ping"),
    path(f'{API_PATH}/pingpong', views.PingPong.as_view(), name="pingpong"),
    path(f'{API_PATH}/analyze/file', views.AnalyzeFiles.as_view(), name="analyze-files"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
