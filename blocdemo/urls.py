from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('analyze', views.analyze, name='analyze'),
    path('results', views.analysis_results, name='results'),
    path('methodology', views.methodology, name='methodology'),
    path('analyze_file', views.analyze_file, name='analyze_file'),
    path('upload', views.UploadView.as_view(), name='fileupload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
