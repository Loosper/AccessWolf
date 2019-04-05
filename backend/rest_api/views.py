from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Person, Group, Event, Room, Attendance
from . import serializers as ser


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = ser.GroupSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = ser.PersonSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = ser.RoomSerializer


class CheckInViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = ser.AttendanceSerializer

    @action(detail=True, methods=['post'])
    def check_in(self, request, card_id, room_id):
        try:
            person = Person.objects.get(card_id=card_id)
            room = Room.objects.get(id=room_id)
        except (Person.DoesNotExist, Room.DoesNotExist):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        checked_in = self.get_queryset().filter(person=person, check_out=None).first()
        if checked_in:
            checked_in.check_out = timezone.now()
            checked_in.save()

        else:
            attendance = Attendance(
                person=person,
                room=room
            )
            attendance.save()

        return Response(status=status.HTTP_201_CREATED)
