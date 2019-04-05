from django.contrib import admin
from .models import Person, Group, Room, Event, Attendance


admin.site.register(Group)
admin.site.register(Person)
admin.site.register(Room)
admin.site.register(Attendance)
admin.site.register(Event)

