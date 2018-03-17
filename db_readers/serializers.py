from marshmallow import Schema, fields


class ScheduleSchema(Schema):
    id = fields.Integer()
    start_time = fields.Time()
    end_time = fields.Time()
    assigned_class = fields.Function(lambda obj: obj.id)
    # NOTE: this should break on mutliple teachers
    teachers = fields.List(fields.Function(lambda obj: obj.id))


class StudentSchema(Schema):
    id = fields.Integer()
    guid = fields.String()
    name = fields.String()
    number_in_class = fields.Integer()

    assigned_class = fields.Function(
        lambda obj: str(obj.assigned_class.number) + obj.assigned_class.name
    )
    assigned_class_id = fields.Integer(attrubute='class_id')


class TeacherSchema(Schema):
    id = fields.Integer()
    guid = fields.String()
    name = fields.String()

    schedules = fields.Nested(ScheduleSchema, many=True)


class StudentClassSchema(Schema):
    id = fields.Integer()
    number = fields.Integer()
    name = fields.String()


class AttendanceSchema(Schema):
    id = fields.Integer()
    attended = fields.String()
    date = fields.Date()
    schedule_id = fields.Integer()
    student_id = fields.Integer()
