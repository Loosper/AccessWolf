# from django.shortcuts import render
from rest_framework import viewsets

from . import models as mod
from . import serializers as ser


class GroupViewSet(viewsets.ModelViewSet):
    queryset = mod.Group.objects.all()
    serializer_class = ser.GroupSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = mod.Person.objects.all()
    serializer_class = ser.PersonSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = mod.Room.objects.all()
    serializer_class = ser.RoomSerializer
