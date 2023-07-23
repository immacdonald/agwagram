from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('analyze-user', views.AnalyzeUser.as_view(), name='analyze-user'),
    path('results', views.analysis_results, name='results'),
    path('methodology', views.methodology, name='methodology'),
    path('analyze-file', views.AnalyzeFile.as_view(), name='analyze-file'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
