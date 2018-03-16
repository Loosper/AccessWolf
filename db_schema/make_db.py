from sqlalchemy import Column, Integer, String, Date, Time, Boolean,\
    ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
# from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from settings import ROOT  # USER, PASSWORD

Base = declarative_base()


schedule_mapping = Table(
    'schedule_map', Base.metadata,
    Column('teacher_id', Integer, ForeignKey('teachers.guid')),
    Column('schedule_id', Integer, ForeignKey('schedules.id'))
)


class StudentClass(Base):
    __tablename__ = 'classes'

    id = Column(Integer, primary_key=True, autoincrement=True)
    number = Column(Integer, nullable=False)
    name = Column(String, nullable=False)

    students = relationship('Student')
    schedules = relationship('Schedule', back_populates='assigned_class')


class Schedule(Base):
    __tablename__ = 'schedules'

    id = Column(Integer, primary_key=True, autoincrement=True)

    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    class_id = Column(Integer, ForeignKey('classes.id'))

    teaches = relationship(
        'Teacher', secondary=schedule_mapping, back_populates='schedules'
    )
    currently_attending = relationship(
        'CurrentAttendance',
        back_populates='current_schedule'
    )
    assigned_class = relationship('StudentClass', back_populates='schedules')
    attended = relationship('Attendance', back_populates='schedule')


class Teacher(Base):
    __tablename__ = 'teachers'

    guid = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    schedules = relationship(
        'Schedule', secondary=schedule_mapping, back_populates='teachers'
    )

    def __repr__(self):
        return 'Teacher {self.name}, id: {self.guid}'


class Student(Base):
    __tablename__ = 'students'

    guid = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    class_number = Column(Integer, nullable=False)

    class_id = Column(Integer, ForeignKey('classes.id'))

    assigned_class = relationship('StudentClass', back_populates='students')
    current_class = relationship(
        'CurrentAttendance', uselist=False, back_populates='student'
    )
    attended_schedules = relationship('Attendance', back_populates='student')

    def __repr__(self):
        return 'Student {self.name}, id: {self.guid}'


class Attendance(Base):
    __tablename__ = 'attendaces'

    id = Column(Integer, primary_key=True, autoincrement=True)

    status = Column(Boolean, nullable=False)
    date = Column(Date, nullable=False)

    schedule_id = Column(Integer, ForeignKey('schedules.id'))
    student_id = Column(Integer, ForeignKey('students.guid'))

    schedule = relationship('Schedule')
    student = relationship('Student')


class CurrentAttendance(Base):
    __tablename__ = 'current_attendances'

    id = Column(Integer, primary_key=True, autoincrement=True)

    student_id = Column(Integer, ForeignKey('students.guid'))
    schedule_id = Column(Integer, ForeignKey('schedules.id'))

    student = relationship('Student', back_populates='current_class')
    current_schedule = relationship(
        'Schedule',
        back_populates='currently_attending'
    )
    checkin = Column(Time, nullable=False)
    checkout = Column(Time, nullable=True)


if __name__ == '__main__':
    engine = create_engine(
        f'sqlite+pysqlite:///{ROOT}/database.db',
        # connect_args={'check_same_thread': False},
        # poolclass=StaticPool,
        echo=True
    )
    Base.metadata.create_all(engine)

    # Session = sessionmaker(bind=engine)
    # engine.dispose()
