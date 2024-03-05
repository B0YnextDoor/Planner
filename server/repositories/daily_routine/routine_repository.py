from contextlib import AbstractContextManager
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.daily_routine.daily_routine_model import DailyRoutine, Habit
from models.user.user_model import User
from core.config import configs


class RoutineRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all(self):
        with self.session_factory() as session:
            return session.query(DailyRoutine).all()

    def get_habbits_all(self):
        with self.session_factory() as session:
            return session.query(Habit).all()

    def buy_user_pro(self, id: int, pro_code: str):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(User.id == id).first()
                if db_user is None:
                    return None
                elif pro_code != configs.PRO_CODE:
                    return 'wrong code'
                db_user.is_pro = True
                db_user.achievements['2'] = ""
                daily_routine = DailyRoutine(db_user.id)
                session.add(daily_routine)
                session.commit()
                session.refresh(daily_routine)
                session.refresh(db_user)
            except IntegrityError:
                raise IntegrityError()
            return db_user

    def get_user_routine(self, id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            if len(db_user.routine) == 0:
                return 'no-routine'
            return db_user.routine[0]

    def get_user_habits(self, id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            if len(db_user.routine) == 0 or db_user.routine[0].habits is None or len(db_user.routine[0].habits) == 0:
                return 'no-routine'
            return session.query(Habit).filter(
                Habit.routine_id == db_user.routine[0].id).order_by(Habit.order.asc()).all()

    def create_user_habit(self, user_id: int, name: str, duration: int, color: str):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None or db_user.is_pro == False:
                    return None
                elif len(db_user.routine) == 0:
                    return 'no-routine'
                elif db_user.routine[0].sleep_time - duration < 300:
                    return 'no-time'
                habit = Habit(name, duration, color, db_user.routine[0].id)
                session.add(habit)
                session.commit()
                self.upd_user_routine(user_id)
                session.refresh(habit)
            except IntegrityError:
                raise IntegrityError()
            return habit

    def upd_user_routine(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(
                User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            if len(db_user.routine) == 0:
                return 'no-routine'
            db_user.routine[0].sleep_time = 1440
            if db_user.routine[0].habits is not None:
                work_time = sum(
                    habit.duration for habit in db_user.routine[0].habits)
            try:
                db_user.routine[0].sleep_time -= work_time
                session.commit()
                session.refresh(db_user.routine[0])
            except IntegrityError:
                raise IntegrityError()
            return db_user.routine[0]

    def upd_habits_order(self, user_id: int, order: list[int]):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None or db_user.is_pro == False:
                    return None
                elif len(db_user.routine) == 0 or len(db_user.routine[0].habits) == 0:
                    return 'no-routine'
                for idx, new_order in enumerate(order):
                    habit = session.query(Habit).filter(
                        Habit.id == new_order).first()
                    if habit is None:
                        return 'no-routine'
                    habit.order = idx
                session.commit()
                session.refresh(db_user)
            except IntegrityError:
                raise IntegrityError()
            return self.get_user_habits(user_id)

    def upd_user_habbit(self, user_id: int, id: int, name: str, duration: int, color: str):
        with self.session_factory() as session:
            db_user = session.query(User).filter(
                User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            elif len(db_user.routine) == 0 or len(db_user.routine[0].habits) == 0:
                return 'no-routine'
            elif db_user.routine[0].sleep_time - duration < 300:
                return 'no-time'
            try:
                habit = session.query(Habit).filter(Habit.id == id).first()
                habit.name = name
                habit.duration = duration
                habit.color = color
                session.commit()
                self.upd_user_routine(user_id)
                session.refresh(habit)
            except IntegrityError:
                raise IntegrityError()
            return habit

    def del_user_habit(self, user_id: int, id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(
                User.id == user_id).first()
            if db_user is None or db_user.is_pro == False:
                return None
            elif len(db_user.routine) == 0 or len(db_user.routine[0].habits) == 0:
                return 'no-routine'
            try:
                session.delete(session.query(
                    Habit).filter(Habit.id == id).first())
                session.commit()
                self.upd_user_routine(user_id)
            except IntegrityError:
                raise IntegrityError()
            return "habit deleted"