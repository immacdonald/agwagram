from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path("", views.main, name="main"),
    path("analyze", views.analyze, name="analyze"),
    path("results", views.analysis_results, name="results"),
    path("methodology", views.methodology, name="methodology"),
]
