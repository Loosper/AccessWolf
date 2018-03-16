from marshmallow import Schema, fields


class ScheduleSchema(Schema):
    class_name = fields.Function(
        lambda obj: obj.name,
        load_from='assigned_class'
    )
    class_number = fields.Function(
        lambda obj: obj.number,
        load_from='assigned_class'
    )

    class Meta:
        fields = ('id', 'start_time', 'end_time')


class StudentSchema(Schema):
    schedules = fields.Nested(ScheduleSchema, many=True)

    class Meta:
        fields = ('id', 'name', 'class_number')


class TeacherSchema(Schema):
    schedules = fields.Nested(ScheduleSchema, many=True)

    class Meta:
        fields = ('id', 'name')
