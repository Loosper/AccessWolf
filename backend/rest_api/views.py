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
    serializer_class = ser.FullPersonSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = ser.RoomSerializer


class WriteEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = ser.WriteEventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = ser.EventSerializer

    def list(self, request):
        # get events dict to modify
        data = self.get_serializer_class()(Event.objects.all(), many=True).data

        for index, event_obj in enumerate(data):
            event = Event.objects.get(id=event_obj['id'])
            people = event.people.all()

            for group in event.groups.all():
                people &= Person.filter(groups__in=group).all()

            # people is a list of unique people
            data[index]['people'] = len(people)
            data[index].pop('groups')

        return Response(data)

    # this is necessary because the other sesrialiser can't create just by id
    def create(slef, request):
        serializer = ser.WriteEventSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            return Response(status=status.HTTP_201_CREATED)
        else:
            attendance = Attendance(
                person=person,
                room=room
            )
            attendance.save()
            return Response(status=status.HTTP_200_OK)


class LocationView(APIView):
    def get(self, request, user_id):
        try:
            person = Person.objects.get(id=user_id)
        except Person.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        check_ins = Attendance.objects.filter(person=person)
        current = check_ins.filter(check_out=None).first()

        if current:
            location = current.room
            active = True
            last_seen = current.check_in
        else:
            last = check_ins.order_by('check_out').last()
            # if person has never been anywhere
            location = getattr(last, 'room', None)
            active = False
            last_seen = last.check_out

        data = ser.RoomSerializer(location).data
        data['active'] = active
        data['last_seen'] = last_seen
        return Response(data)
