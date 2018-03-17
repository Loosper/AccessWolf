#! /usr/bin/env python
import sys
import json

from sqlalchemy.orm import sessionmaker
from make_db import engine, StudentClass, Teacher, Student, Schedule


if len(sys.argv) < 2:
    print(
        '''Usage: [file to read from]
        pass option \'help\' for help'''
    )
    sys.exit()

datatypes = {
    'student': Student,
    'teacher': Teacher,
    'class': StudentClass,
    'schedule': Schedule
}

session = sessionmaker(bind=engine)()

with open(sys.argv[1], 'r') as file:
    try:
        data = json.loads(file.read())
    except json.JSONDecodeError:
        print('Sorry, incorrect file')

    for key in data.keys():
        schema = datatypes[key.lower()]
        new_rows = schema(**data[key])
        session.add(new_rows)

session.commit()
