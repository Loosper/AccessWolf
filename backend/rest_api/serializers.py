from rest_framework import serializers
from rest_framework.serializers import CharField

from .models import Group, Person, Room, Attendance


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'groups', 'card_id')


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name')

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        # fields('id', 'name')
