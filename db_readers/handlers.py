from tornado.web import RequestHandler

from make_db import Student, Teacher
from serializers import StudentSchema, TeacherSchema


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
