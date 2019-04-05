from rest_framework import serializers
from rest_framework.serializers import CharField

from .models import Group, Person, Room, Event, Attendance


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class ShortPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name')


class FullPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    people = ShortPersonSerializer(many=True)
    groups = GroupSerializer(many=True)
    room = RoomSerializer()
    organisers = ShortPersonSerializer(many=True)

    class Meta:
        model = Event
        fields = '__all__'


class WriteEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        # fields('id', 'name')
