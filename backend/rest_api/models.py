from django.db import models

from django.db.models import CharField, ForeignKey, ManyToManyField
from django.db.models import DateTimeField


class Group(models.Model):
    name = CharField(max_length=100)
    image = CharField(max_length=500, blank=True)
    # people = models.ManyToManyField(Group)

    def __str__(self):
        return f'Group {self.name}'


class Person(models.Model):
    name = CharField(max_length=100)
    card_id = CharField(max_length=10, unique=True)
    groups = ManyToManyField(Group, blank=True)
    image = CharField(max_length=500, blank=True)

    def __str__(self):
        return f'Person {self.name}'


class Room(models.Model):
    name = CharField(max_length=100)

    def __str__(self):
        return f'Room {self.name}'


class Event(models.Model):
    title = CharField(max_length=100)
    description = CharField(max_length=250, blank=True)
    image = CharField(max_length=500, blank=True)
    start = DateTimeField()
    end = DateTimeField()
    room = ForeignKey(Room, on_delete=models.CASCADE)
    organisers = ManyToManyField(Person, related_name='organisers')
    groups = ManyToManyField(Group, blank=True)
    people = ManyToManyField(Person, blank=True, related_name='attendees')

    def __str__(self):
        return f'Event {self.title}'


class Attendance(models.Model):
    check_in = DateTimeField()
    check_out = DateTimeField(null=True)
    person = ForeignKey(Person, on_delete=models.CASCADE)
    room = ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.person} attendance for {self.room}'

