from sqlalchemy import Column, Integer, String, Date, Time, Boolean,\
    ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

from settings import DB_PATH, DB_TYPE

Base = declarative_base()


schedule_mapping = Table(
    'schedule_map', Base.metadata,
    Column('teacher_id', Integer, ForeignKey('teachers.id')),
    Column('schedule_id', Integer, ForeignKey('schedules.id'))
)


class StudentClass(Base):
    __tablename__ = 'classes'

    id = Column(Integer, primary_key=True, autoincrement=True)

    number = Column(Integer, nullable=False)
    name = Column(String, nullable=False)

    # one to many
    students = relationship('Student', back_populates='assigned_class')
    # one to many
    schedules = relationship('Schedule', back_populates='assigned_class')


class Schedule(Base):
    __tablename__ = 'schedules'

    id = Column(Integer, primary_key=True, autoincrement=True)

    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    class_id = Column(Integer, ForeignKey('classes.id'))

    # many to many
    teachers = relationship(
        'Teacher', secondary=schedule_mapping, back_populates='schedules'
    )
    # one to many
    currently_attending = relationship(
        'CurrentAttendance',
        back_populates='current_schedule'
    )
    # one to one
    assigned_class = relationship('StudentClass', back_populates='schedules')
    # one to many
    attended = relationship('Attendance', back_populates='schedule')


class Teacher(Base):
    __tablename__ = 'teachers'

    id = Column(Integer, primary_key=True, autoincrement=True)

    guid = Column(String, nullable=False)
    name = Column(String, nullable=False)

    # many to many
    schedules = relationship(
        'Schedule', secondary=schedule_mapping, back_populates='teachers'
    )

    def __repr__(self):
        return 'Teacher {self.name}, id: {self.guid}'


class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True, autoincrement=True)

    guid = Column(String, nullable=False)
    name = Column(String, nullable=False)

    class_id = Column(Integer, ForeignKey('classes.id'))

    # one to many
    assigned_class = relationship('StudentClass', back_populates='students')
    # one to one
    current_class = relationship(
        'CurrentAttendance', uselist=False, back_populates='student'
    )
    # one to many
    attended_schedules = relationship('Attendance', back_populates='student')

    def __repr__(self):
        return 'Student {self.name}, id: {self.guid}'


class Attendance(Base):
    __tablename__ = 'attendances'

    id = Column(Integer, primary_key=True, autoincrement=True)

    status = Column(Boolean, nullable=False)
    date = Column(Date, nullable=False)

    schedule_id = Column(Integer, ForeignKey('schedules.id'))
    student_id = Column(Integer, ForeignKey('students.id'))

    # one to one
    schedule = relationship('Schedule', back_populates='attended')
    # one to one
    student = relationship('Student', back_populates='attended_schedules')


class CurrentAttendance(Base):
    __tablename__ = 'current_attendances'

    id = Column(Integer, primary_key=True, autoincrement=True)

    student_id = Column(Integer, ForeignKey('students.id'))
    schedule_id = Column(Integer, ForeignKey('schedules.id'))

    # one to one
    student = relationship('Student', back_populates='current_class')
    # one to one
    current_schedule = relationship(
        'Schedule',
        back_populates='currently_attending'
    )
    checkin = Column(Time, nullable=False)
    checkout = Column(Time, nullable=True)


print(f'{DB_TYPE}://{DB_PATH}')
engine = create_engine(
    f'{DB_TYPE}://{DB_PATH}',
    # connect_args={'check_same_thread': False},
    # poolclass=StaticPool,
    echo=True
)

if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
