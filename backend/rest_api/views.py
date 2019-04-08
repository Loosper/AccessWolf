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

    def retrieve(self, request, pk=None):
        try:
            people_attend = Attendance.objects.filter(room=pk, check_out=None)

            people = Person.objects.filter(id__in=people_attend)

            people_ser = ser.ShortPersonSerializer(people, many=True)

            retrieve_data = dict(ser.RoomSerializer(Room.objects.get(pk=pk)).data)
            retrieve_data['people'] = people_ser.data
            response = Response(retrieve_data)
        except Room.DoesNotExist:
            response = Response(status=status.HTTP_400_BAD_REQUEST)
        return response


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = ser.EventSerializer

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
        location = Attendance.objects.filter(person=person, check_out=None).first()
        # TODO:
        # if location:
        #     location = location.room
        # else:
        #     location = Attendance.objects.filter(person)

        print(ser.FullPersonSerializer(person).data)
        return Response()
        # return Response(ser.RoomSerializer(location).data)
