from django.utils import timezone
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Person, Group, Event, Room, Attendance
from . import serializers as ser


def att_condition(event):
        condition = (
            # if person was there at all http://baodad.blogspot.com/2014/06/date-range-overlap.html
            (~ (Q(check_out__lte=event.start) | Q(check_in__gte=event.end))) & ~Q(check_out=None)
        ) | (
            # and if the person is still there
            Q(check_out=None) & Q(check_in__lt=event.end)
        )
        return condition


def is_late(attendance, event):
    return attendance.check_in > event.start


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = ser.GroupSerializer

    @action(detail=False, methods=['get'])
    def search(self, request, beginning):
        groups = Group.objects.filter(name__istartswith=beginning).all()
        data = ser.GroupSerializer(groups, many=True).data
        return Response(data)


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = ser.FullPersonSerializer

    # TODO: pagination
    @action(detail=True, methods=['get'])
    def events(self, request, pk):
        try:
            person = Person.objects.get(id=pk)
        except Person.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serialise = lambda events: ser.ShortEventSerializer(events).data
        ret_data = {
            'person_id': pk,
            'events': []
        }

        # TODO: account for uninvited guests. Possible solutions:
        # table to map attendances with events. Populate at checkin/checkout
        # drawback: unattended events are not accounted for
        events = Event.objects.filter(people__in=[person])
        events |= Event.objects.filter(groups__in=person.groups.all())
        events |= Event.objects.filter(organisers__in=[person])

        for event in events:
            data = serialise(event)
            entries = Attendance.objects.filter(
                att_condition(event), person=person
            )
            # if person was there, he will have at least one attendance
            data['attended'] = len(entries) >= 1
            if data['attended']:
                data['late'] = is_late(entries.order_by('check_in').first(), event)
            else:
                # can't be late if you never showed up
                data['late'] = False

            ret_data['events'].append(data)

        return Response(ret_data)

    @action(detail=False, methods=['get'])
    def search(self, request, beginning):
        ppl = Person.objects.filter(name__istartswith=beginning).all()
        data = ser.ShortPersonSerializer(ppl, many=True).data
        return Response(data)


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

    @action(detail=True, methods=['get'])
    def attendance(self, request, pk):
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        final_data = {'event_id': pk, 'people': []}
        involved = Attendance.objects.filter(att_condition(event), room=event.room)
        people_involved = {at.person for at in involved}

        for person in people_involved:
            data = ser.ShortPersonSerializer(person).data
            att = involved.filter(person=person).latest('check_in')

            # if person hasn't checked out, he's still there
            data['there'] = att.check_out is None
            data['late'] = is_late(att, event)
            final_data['people'].append(data)

        return Response(final_data)

    @action(detail=False, methods=['get'])
    def search(self, request, beginning):
        events = Event.objects.filter(title__istartswith=beginning).all()
        data = ser.ShortEventSerializer(events, many=True).data
        return Response(data)


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
                check_in=timezone.now(),
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
        data['room_id'] = data.get('id', None)
        try:
            data.pop('id')
        except:
            pass
        data['active'] = active
        data['last_seen'] = last_seen
        return Response(data)
