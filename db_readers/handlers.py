import os

from tornado.web import RequestHandler, StaticFileHandler

from db_schema import Student, Teacher
from serializers import StudentSchema, TeacherSchema


class SingleStaticHandler(StaticFileHandler):
    def initialize(self, path):
        self.dirname, self.filename = os.path.split(path)
        super().initialize(self.dirname)

    def get(self, path=None, include_body=True):
        super().get(self.filename, include_body)


class DatabaseHandler(RequestHandler):
    def initialize(self, session):
        self.session = session()
        self.schema = self.get_schema()

    def on_finish(self):
        self.session.commit()
        self.session.close()

    def get_schema(self):
        raise NotImplemented


class StudentHandler(DatabaseHandler):
    async def get(self):
        print(self.schema.dump(self.session.query(Student).all()))

    def get_schema(self):
        return StudentSchema(many=True)


class TeacherHandler(DatabaseHandler):
    async def get(self):
        self.session.query(Teacher).all()

    def get_schema(self):
        return TeacherSchema()
