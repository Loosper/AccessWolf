from rest_framework import serializers
from rest_framework.serializers import CharField

from .models import Group, Person, Room, Event, Attendance


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'groups', 'card_id')
        # depth = 1


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        # depth = 1


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        # fields('id', 'name')
