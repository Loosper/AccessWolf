from sqlalchemy.orm import sessionmaker
from db_schema import engine, Schedule, Student, Attendance


session = sessionmaker(bind=engine)()


def check_abscences():
    for schedule in session.query(Schedule).filter(Schedule.date).all():
        unknown = set(schedule.assigned_class.students)
        already_known = set(
            session.query(Student).
            filter(Student.attended_schedules._is(schedule))
        )
        unknown.remove(already_known)

        for abscent in unknown:
            Attendance(attended=False, date=date.now())
