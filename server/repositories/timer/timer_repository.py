from contextlib import AbstractContextManager
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.timer.settings_model import TimerSettings
from models.timer.timer_model import Timer, TimerRound
from models.user.user_model import User


class TimerRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_sessions(self):
        with self.session_factory() as session:
            return session.query(Timer).all()

    def get_rounds(self):
        with self.session_factory() as session:
            try:
                timers = session.query(Timer).all()
                if timers is None:
                    return None
                rounds = []
                for timer in timers:
                    rounds.append(timer.rounds[0])
            except IntegrityError:
                raise IntegrityError()
            return rounds

    def get_timer_settings(self, id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == id).first()
            if db_user is None:
                return None
            return db_user.timer_settings[0]

    def upd_timer_settings(self, new_work_itv: int, new_rest_itv: int, new_laps_ammount: int, id: int):
        with self.session_factory() as session:
            try:
                user_settings = session.query(TimerSettings).filter(
                    TimerSettings.user_id == id).first()
                if user_settings is None:
                    return None
                user_settings.work_interval = new_work_itv
                user_settings.rest_interval = new_rest_itv
                user_settings.laps_ammount = new_laps_ammount
                session.commit()
                session.refresh(user_settings)
            except IntegrityError:
                raise IntegrityError()
            return 'Timer settings updated'

    def get_current_round(self, id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == id).first()
            if db_user is None:
                return None
            if len(db_user.timer) == 0 or db_user.timer[0].is_completed == True:
                return "no-sess"
            return db_user.timer[0].rounds[0]

    def create_timer_session(self, id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == id).first()
            if db_user is None:
                return None
            if len(db_user.timer) > 0:
                return self.upd_timer_session(id, False)
            try:
                timer = Timer(id)
                session.add(timer)
                session.commit()
                settings = session.query(TimerSettings).filter(
                    TimerSettings.user_id == id).first()
                if settings is None:
                    return None
                self.create_timer_round(
                    timer.id, settings.work_interval, settings.rest_interval)
                session.refresh(timer)
            except IntegrityError:
                raise IntegrityError()
            return 'Timer created'

    def create_timer_round(self, timer_id: int, work_interval: int, rest_interval: int):
        with self.session_factory() as session:
            timer = session.query(Timer).filter(
                Timer.id == timer_id).first()
            if timer is None:
                return "no-sess"
            if len(timer.rounds) > 0:
                return self.upd_timer_round(timer.user_id, 0, work_interval*60, rest_interval*60)
            try:
                round = TimerRound(
                    timer_id, total_work_seconds=work_interval*60, total_rest_seconds=rest_interval*60)
                session.add(round)
                session.commit()
                session.refresh(round)
            except IntegrityError:
                raise IntegrityError()
            return round

    def upd_timer_round(self, user_id: int, curr_lap: int, total_work_seconds: int, total_rest_seconds: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            if len(db_user.timer) == 0 or db_user.timer[0].is_completed == True:
                return "no-sess"
            round = session.query(TimerRound).filter(
                TimerRound.timer_id == db_user.timer[0].id).first()
            try:
                round.curr_lap = curr_lap
                round.total_work_seconds = total_work_seconds
                round.total_rest_seconds = total_rest_seconds
                session.commit()
                session.refresh(round)
            except IntegrityError:
                raise IntegrityError()
            return 'Round updated'

    def upd_timer_session(self, user_id: int, value: bool):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            timer = db_user.timer
            if len(timer) == 0:
                return "no-sess"
            if len(timer[0].rounds) == 0:
                self.create_timer_round(timer[0].id)
            try:
                timer[0].is_completed = value
                if value == True:
                    settings = session.query(TimerSettings).filter(
                        TimerSettings.user_id == user_id).first()
                    if settings is None:
                        return None
                    self.upd_timer_round(
                        user_id, 0, settings.work_interval*60, settings.rest_interval*60)
                session.commit()
                session.refresh(timer[0])
            except IntegrityError:
                raise IntegrityError()
            return f'Session completed: {value}'
