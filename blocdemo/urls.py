from django.urls import path

from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('analyze', views.analyze, name='analyze'),
    path('results', views.analysis_results, name='results'),
    path('methodology', views.methodology, name='methodology'),
    path('analyze_file', views.analyze_file, name='analyze_file')
]
