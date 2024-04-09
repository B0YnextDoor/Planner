from contextlib import AbstractContextManager
from re import template
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.daily_routine.daily_routine_model import Habit
from models.daily_routine.routine_template_model import RoutineTemplate, TemplateHabit
from models.user.user_model import User


class RoutineTemplateRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_user_templates(self, id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            return db_user.routine_template

    def create_template(self, sleep_time: int, habits: list[int], user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            try:
                template = RoutineTemplate(
                    len(db_user.routine_template) + 1, sleep_time, user_id)
                session.add(template)
                session.commit()
                session.refresh(template)
                for habit_id in habits:
                    db_habit = session.query(Habit).filter(
                        Habit.id == habit_id).first()
                    if db_habit is not None:
                        template_habit = TemplateHabit(
                            db_habit.name, db_habit.duration, db_habit.color, db_habit.order, template.id)
                        session.add(template_habit)
                        session.commit()
            except IntegrityError:
                raise IntegrityError()
            return "Template created"

    def update_template(self, name: str, template_id: int, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            template = session.query(RoutineTemplate).filter(
                RoutineTemplate.id == template_id).first()
            if len(db_user.routine_template) == 0 or template is None:
                return 'no-template'
            try:
                template.name = name
                session.commit()
                session.refresh(template)
            except IntegrityError:
                raise IntegrityError()
            return "Template updated"

    def update_template_habits(self, template_id: int, time: int, habits: list[int], user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            template = session.query(RoutineTemplate).filter(
                RoutineTemplate.id == template_id).first()
            if len(db_user.routine_template) == 0 or template is None:
                return 'no-template'
            template_habits = template.habits
            for habit in template_habits:
                session.delete(habit)
                session.commit()
            template.sleep_time = time
            session.commit()
            session.refresh(template)
            for habit_id in habits:
                db_habit = session.query(Habit).filter(
                    Habit.id == habit_id).first()
                if db_habit is not None:
                    template_habit = TemplateHabit(
                        db_habit.name, db_habit.duration, db_habit.color, db_habit.order, template.id)
                    session.add(template_habit)
                    session.commit()
            return "Template updated"

    def delete_template(self, template_id: int, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            template = session.query(RoutineTemplate).filter(
                RoutineTemplate.id == template_id).first()
            if len(db_user.routine_template) == 0 or template is None:
                return 'no-template'
            try:
                session.delete(template)
                session.commit()
            except IntegrityError:
                raise IntegrityError()
            return "Template deleted"

    def load_template(self, template_id: int, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            template = session.query(RoutineTemplate).filter(
                RoutineTemplate.id == template_id).first()
            if len(db_user.routine_template) == 0 or template is None:
                return 'no-template'
            routine = db_user.routine[0]
            habits = routine.habits
            if len(habits) > 0:
                for habit in habits:
                    session.delete(habit)
                    session.commit()
            routine.sleep_time = template.sleep_time
            session.commit()
            session.refresh(routine)
            template_habits = template.habits
            for habit in template_habits:
                session.add(Habit(habit.name, habit.duration,
                            habit.color, routine.id, habit.order))
                session.commit()
            return 'Template loaded'
