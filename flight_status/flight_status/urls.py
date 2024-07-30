from django.contrib import admin
from django.urls import path
from flights import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/flights/<str:flight_id>/', views.get_flight_status),
    path('api/subscribe/', views.subscribe),
]
