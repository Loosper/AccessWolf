from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'groups', views.GroupViewSet)
router.register(r'people', views.PersonViewSet)
router.register(r'rooms', views.RoomViewSet)
router.register(r'events', views.EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path(
        'check_in/<str:card_id>/room/<str:room_id>/',
        views.LocationView.as_view({'post': 'check_in'})
    ), path(
        'where/<str:user_id>/', views.LocationView.as_view({'get': 'locate'}),
    ), path(
        'people/search/<beginning>/', views.PersonViewSet.as_view({'get': 'search'})
    ), path(
        'events/search/<beginning>/', views.EventViewSet.as_view({'get': 'search'})
    ), path(
        'groups/search/<beginning>/', views.GroupViewSet.as_view({'get': 'search'})
    )
]
