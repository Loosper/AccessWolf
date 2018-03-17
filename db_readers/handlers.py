import os

from tornado.web import RequestHandler, StaticFileHandler

from db_schema import Student, Teacher, Schedule, StudentClass
from serializers import StudentSchema, TeacherSchema, ScheduleSchema,\
    StudentClassSchema, AttendanceSchema


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
        students = self.session.query(Student)

        if class_id:
            class_id = class_id.strip().split()
            students.filter(
                Student.assigned_class.number == int(class_id[0]),
                Student.assigned_class.name == class_id[1].upper()
            )

        self.write(self.serializer(students.all()).data)

    def get_schema(self):
        return StudentSchema(many=True)


class TeacherHandler(DatabaseHandler):
    async def get(self):
        self.write(self.serializer(self.session.query(Teacher).all()).data)

    def get_schema(self):
        return TeacherSchema(many=True)


class ScheduleHandler(DatabaseHandler):
    async def get(self):
        # self.get_arguments()
        self.write(self.serializer(self.session.query(Schedule).all()).data)

    def get_schema(self):
        return ScheduleSchema(many=True)


class StudentClassHandler(DatabaseHandler):
    async def get(self):
        self.write(
            self.serializer(self.session.query(StudentClass).all()).data
        )

    def get_schema(self):
        return StudentClassSchema(many=True)


class AttendanceHanlder(DatabaseHandler):
    async def get(self):
        self.write(
            self.serializer(self.session.query(StudentClass).all()).data
        )

    def get_schema(self):
        return AttendanceSchema(many=True)
