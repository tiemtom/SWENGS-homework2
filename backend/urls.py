from django.conf.urls import url
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from homework2.backend import views

urlpatterns = [
    path('car/list', views.car_list),
    path('car/create', views.car_create),
    path('car/<int:pk>/get', views.car_detail),
    path('car/<int:pk>/delete', views.car_detail),
    path('car/<int:pk>/update', views.car_update),
    path('manufacturer/list', views.manufacturer_list),
    path('manufacturer/create', views.manufacturer_create),
    path('manufacturer/<int:pk>/get', views.manufacturer_detail),
    path('manufacturer/<int:pk>/delete', views.manufacturer_detail),
    path('manufacturer/<int:pk>/update', views.manufacturer_update),
    path('manufacturer/options', views.manufacturer_option_list),
    path('manufacturer/ceos', views.manufacturer_ceo_id_list),
    path('person/options', views.person_option_list),
    url(r'^api-token-auth/', obtain_jwt_token),
]