from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('api.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('tools/agwagram/', include('api.urls')),
    path('tools/agwagram/admin/', admin.site.urls),
    path('tools/agwagram/api-auth/', include('rest_framework.urls'))
]
