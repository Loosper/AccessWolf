import os

from tornado.web import RequestHandler, StaticFileHandler

from db_schema import Student, Teacher, Schedule, StudentClass, Attendance
from serializers import StudentSchema, TeacherSchema, ScheduleSchema,\
    StudentClassSchema, AttendanceSchema, CurrentAttendanceSchema


class SingleStaticHandler(StaticFileHandler):
    def initialize(self, path):
        self.dirname, self.filename = os.path.split(path)
        super().initialize(self.dirname)

    def get(self, path=None, include_body=True):
        super().get(self.filename, include_body)


class DatabaseHandler(RequestHandler):
    def initialize(self, session):
        self.session = session()
        self.serializer = self.get_schema().dumps

    def on_finish(self):
        self.session.commit()
        self.session.close()

    def get_schema(self):
        raise NotImplemented


class StudentHandler(DatabaseHandler):
    async def get(self):
        class_id = self.get_query_argument('assigned_class', default=None)
        query = self.session.query(Student)

        if class_id:
            class_id = class_id.strip().split()
            query = query.filter(
                Student.assigned_class.has(number=int(class_id[0])),
                Student.assigned_class.has(name=class_id[1].upper())
            )

        self.write(self.serializer(query.all()).data)

    def get_schema(self):
        return StudentSchema(many=True)


class TeacherHandler(DatabaseHandler):
    async def get(self):
        self.write(self.serializer(self.session.query(Teacher).all()).data)

    def get_schema(self):
        return TeacherSchema(many=True)


class ScheduleHandler(DatabaseHandler):
    async def get(self, class_id=None):
        query = self.session.query(Schedule)

        if class_id:
            query = query.filter(
                Schedule.class_id == int(class_id)
            )

        self.write(self.serializer(query.all()).data)

    def get_schema(self):
        return ScheduleSchema(many=True)


class StudentClassHandler(DatabaseHandler):
    async def get(self, class_id=None):
        query = self.session.query(StudentClass)

        if class_id:
            query = query.filter(StudentClass.id == int(class_id))

        self.write(self.serializer(query.all()).data)

    def get_schema(self):
        return StudentClassSchema(many=True)


class AttendanceHanlder(DatabaseHandler):
    async def get(self, name, id=None, total=None):
        # list presence of schedule, list abscenes of students,
        # list total abscences
        query = self.session.query(Attendance)

        if name == 'student':
            if id:
                query = query.filter(
                    # REVIEW: this sometimes returns bogus people
                    Attendance.student_id == int(id),
                    Attendance.attended.is_(True)
                )
            if total:
                self.write(str(query.count()))
                return
        elif name == 'schedule':
            if id:
                query = query.filter(Attendance.schedule_id == int(id))
        elif name == 'class':
            raise NotImplemented

        self.write(
            self.serializer(query.all()).data
        )

    def get_schema(self):
        return AttendanceSchema(many=True)


class CurrentAttendanceHandler(DatabaseHandler):

    def get_schema(self):
        return CurrentAttendanceSchema
