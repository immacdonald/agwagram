from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.MainView.as_view(), name='main'),
    path('analyze-user', views.AnalyzeUser.as_view(), name='analyze-user'),
    path('results', views.AnalysisResultsView.as_view(), name='results'),
    path('methodology', views.MethodologyView.as_view(), name='methodology'),
    path('analyze-file', views.AnalyzeFile.as_view(), name='analyze-file'),
    path('api/v1/analyze/user', views.Analyze.as_view(), name='api-analyze-user'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
