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

    # this is slow, but i don't want to reimplement retrieve
    def retrieve(self, request, pk):
        response = super().retrieve(request, pk)
        room = Room.objects.get(id=response.data['id'])
        people = [
            att.person for att in Attendance.objects.filter(room=room, check_out=None).all()
        ]
        response.data['people'] = ser.ShortPersonSerializer(people, many=True).data
        return response


# TODO: absences; timeframes or single event?
# TODO: create recurring events

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

            # for group in event.groups.all():
            people |= Person.objects.filter(groups__in=event.groups.all()).all()

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

    @action(detail=False, methods=['post'])
    def recurring(self, request):
        return Response()


class LocationView(viewsets.ViewSet):
    @action(detail=True, methods=['post'])
    def check_in(self, request, card_id, room_id):
        try:
            person = Person.objects.get(card_id=card_id)
            room = Room.objects.get(id=room_id)
        except (Person.DoesNotExist, Room.DoesNotExist):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        checked_in = Attendance.objects.filter(person=person, check_out=None).first()
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

    @action(detail=True, methods=['get'])
    def locate(self, request, user_id):
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
            last_seen = getattr(last, 'check_out', None)

        data = ser.RoomSerializer(location).data
        data['active'] = active
        data['last_seen'] = last_seen
        return Response(data)
