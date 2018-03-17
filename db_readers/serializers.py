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
    name = fields.String()
    number_in_class = fields.Integer()

    assigned_class = fields.Function(lambda obj: obj.id)


class TeacherSchema(Schema):
    id = fields.Integer()
    name = fields.String()

    schedules = fields.Nested(ScheduleSchema, many=True)
