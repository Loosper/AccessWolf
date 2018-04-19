#! /usr/bin/env python3
import sys
import json

from datetime import datetime
from sqlalchemy.orm import sessionmaker
from db_schema import engine, StudentClass, Teacher, Student, Schedule,\
    Attendance


session = sessionmaker(bind=engine, autoflush=False)()


class SmartSchedule(Schedule):
    def __init__(self, teachers=[], **kwargs):
        teachers = session.query(Teacher).\
            filter(Teacher.id.in_(teachers)).all()
        format = '%H:%M:%S'
        kwargs['start_time'] = datetime.strptime(
            kwargs['start_time'], format
        ).time()
        kwargs['end_time'] = datetime.strptime(
            kwargs['end_time'], format
        ).time()
        super().__init__(teachers=teachers, **kwargs)


class SmartTeacher(Teacher):
    def __init__(self, schedules=[], **kwargs):
        schedules = session.query(Schedule).\
            filter(Teacher.id.in_(schedules)).all()
        super().__init__(schedules=schedules, **kwargs)


if len(sys.argv) < 2:
    print(
        '''Usage: [file to read from]
        pass option \'help\' for help'''
    )
    sys.exit()

datatypes = {
    'student': Student,
    'teacher': SmartTeacher,
    'class': StudentClass,
    'schedule': SmartSchedule,
    # opening myself for abuse here
    'attendance': Attendance
}

with open(sys.argv[1], 'r') as file:
    try:
        data = json.loads(file.read())
    except json.JSONDecodeError:
        print('Sorry, incorrect file')
        sys.exit()

    for key in data.keys():
        schema = datatypes[key.lower()]
        new_rows = []

        if isinstance(data[key], list):
            for element in data[key]:
                new_rows.append(schema(**element))
        else:
            new_rows.append(schema(**data[key]))

        for row in new_rows:
            try:
                session.add(row)
                session.commit()
            except Exception as e:
                session.rollback()
                print(e)
