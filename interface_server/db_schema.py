#! /usr/bin/env python
from sqlalchemy import Column as NullColumn

from sqlalchemy import Integer, String, DateTime, Date, Time,\
    ForeignKey, Table, UniqueConstraint, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

from settings import DB_PATH, DB_TYPE, DEBUG_DB_ECHO

Base = declarative_base()


def Column(*args, nullable=False, **kwargs):
    return NullColumn(*args, nullable=nullable, **kwargs)


schedule_mapping = Table(
    'schedule_map', Base.metadata,
    Column('teacher_id', Integer, ForeignKey('teachers.id')),
    Column('schedule_id', Integer, ForeignKey('schedules.id'))
)

attend_mapping = Table(
    'attend_map', Base.metadata,
    Column('teacher_id', Integer, ForeignKey('teachers.id')),
    Column('past_schedule_id', Integer, ForeignKey('past_schedules.id'))
)


class StudentClass(Base):
    __tablename__ = 'student_classes'
    __table_args__ = (
        UniqueConstraint('number', 'name', name='unique_class'),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)

    number = Column(Integer)
    name = Column(String(1))

    # one to many
    students = relationship('Student', back_populates='assigned_class')
    # one to many
    schedules = relationship('Schedule', back_populates='assigned_class')


class Schedule(Base):
    __tablename__ = 'schedules'
    __table_args__ = (
        UniqueConstraint(
            'start_time', 'end_time', 'room', 'class_id',
            name='unique_schedule'
        ),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)

    room = Column(Integer)
    start_time = Column(Time)
    end_time = Column(Time)

    class_id = Column(Integer, ForeignKey('student_classes.id'))

    # many to many
    teachers = relationship(
        'Teacher', secondary=schedule_mapping, back_populates='schedules'
    )
    assigned_class = relationship('StudentClass', back_populates='schedules')
    past_occurances = relationship('PastSchedule', back_populates='schedule')


class Teacher(Base):
    __tablename__ = 'teachers'

    id = Column(Integer, primary_key=True, autoincrement=True)

    guid = Column(String(12), unique=True)
    name = Column(String(128), unique=True)

    # many to many
    schedules = relationship(
        'Schedule', secondary=schedule_mapping, back_populates='teachers'
    )

    attended_schedules = relationship(
        'PastSchedule', secondary=attend_mapping, back_populates='teachers'
    )


class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True, autoincrement=True)

    guid = Column(String(12), unique=True)
    name = Column(String(128), unique=True)
    number_in_class = Column(Integer, unique=True)

    student_class_id = Column(
        Integer, ForeignKey('student_classes.id'),
        nullable=False
    )

    # one to many
    assigned_class = relationship('StudentClass', back_populates='students')
    # one to one
    current_class = relationship(
        'CurrentAttendance', uselist=False, back_populates='student'
    )
    # one to many
    attended_schedules = relationship('Attendance', back_populates='student')


class Attendance(Base):
    __tablename__ = 'attendances'
    __table_args__ = (
        UniqueConstraint(
            'student_id', 'past_schedule_id', 'date',
            name='unique_attendance'
        ),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)

    attended = Column(String(5))
    # late = Column(Boolean, nullable=True)
    date = Column(Date)

    past_schedule_id = Column(Integer, ForeignKey('past_schedules.id'))
    student_id = Column(Integer, ForeignKey('students.id'))

    # one to one
    past_schedule = relationship('PastSchedule', back_populates='attended')
    # one to one
    student = relationship('Student', back_populates='attended_schedules')


class CurrentAttendance(Base):
    __tablename__ = 'current_attendances'
    __table_args__ = (
        UniqueConstraint(
            'student_id', 'room', 'checkin',
            name='unique_attendance'
        ),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)

    room = Column(Integer)
    student_id = Column(Integer, ForeignKey('students.id'))
    # schedule_id = Column(Integer, ForeignKey('schedules.id'))

    # one to one
    student = relationship('Student', back_populates='current_class')
    checkin = Column(DateTime)
    checkout = Column(DateTime, nullable=True)


class PastSchedule(Base):
    __tablename__ = 'past_schedules'
    __table_args__ = (
        UniqueConstraint(
            'schedule_id', 'occurance_date',
            name='unique_past_schedule'
        ),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)

    occurance_date = Column(DateTime)
    over = Column(Boolean)
    schedule_id = Column(Integer, ForeignKey('schedules.id'), nullable=True)
    teacher_id = Column(Integer, ForeignKey('teachers.id'), nullable=True)

    teacher = relationship('Teacher', back_populates='attended_schedules')
    # teachers = relationship(
    #     'Teacher',
    #     secondary=attend_mapping,
    #     back_populates='attended_schedules'
    # )
    schedule = relationship('Schedule', back_populates='past_occurances')
    attended = relationship('Attendance', back_populates='past_schedule')


engine = create_engine(
    '{}://{}'.format(DB_TYPE, DB_PATH),
    # connect_args={'check_same_thread': False},
    # poolclass=StaticPool,
    echo=DEBUG_DB_ECHO
)

if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
