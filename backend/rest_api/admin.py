from django.contrib import admin
from .models import Person, Group, Room


admin.site.register(Group)
admin.site.register(Person)
admin.site.register(Room)

