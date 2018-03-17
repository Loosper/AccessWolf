import os

from tornado.web import RequestHandler, StaticFileHandler

from db_schema import Student, Teacher, Schedule
from serializers import StudentSchema, TeacherSchema, ScheduleSchema


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
        self.write(self.serializer(self.session.query(Student).all()).data)

    def get_schema(self):
        return StudentSchema(many=True)


class TeacherHandler(DatabaseHandler):
    async def get(self):
        self.write(self.serializer(self.session.query(Teacher).all()).data)

    def get_schema(self):
        return TeacherSchema(many=True)


class ScheduleHandler(DatabaseHandler):
    async def get(self):
        print(self.session.query(Schedule).first().teachers)
        self.write(self.serializer(self.session.query(Schedule).all()).data)

    def get_schema(self):
        return ScheduleSchema(many=True)
