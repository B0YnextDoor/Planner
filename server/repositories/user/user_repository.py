from contextlib import AbstractContextManager
from sqlalchemy.exc import IntegrityError
from typing import Callable, List
from sqlalchemy.orm import Session
from models.achievements.achievements_model import Achievement
from models.statistics.statistics_model import UserStatistics
from models.user.user_model import User
from models.timer.settings_model import TimerSettings


class UserRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def del_all(self) -> None:
        with self.session_factory() as session:
            session.query(User).delete()
            session.commit()

    def del_by_id(self, id: int) -> None:
        with self.session_factory() as session:
            session.delete(session.query(User).filter(User.id == id).first())
            session.commit()

    def get_all(self) -> List[User]:
        with self.session_factory() as session:
            return session.query(User).all()

    def get_by_email(self, email: str):
        if email is None:
            return None
        with self.session_factory() as session:
            return session.query(User).filter(User.email == email).first()

    def get_by_id(self, id: int):
        if id is None:
            return None
        with self.session_factory() as session:
            return session.query(User).filter(User.id == id).first()

    def add_user(self, name: str, email: str, hashed_password: str):
        with self.session_factory() as session:
            user = User(name=name, email=email,
                        hashed_password=hashed_password)
            user.achievements[1] = ""
            try:
                session.add(user)
                session.commit()
                session.add(TimerSettings(user.id))
                session.add(UserStatistics(user.id))
                session.commit()
                session.refresh(user)
            except IntegrityError:
                raise IntegrityError()
            return user

    def upd_user_profile(self, new_name: str, new_email: str, new_password: str | None, id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == id).first()
                if db_user is None:
                    return None
                db_user.name = new_name
                db_user.email = new_email
                if new_password is not None:
                    db_user.hashed_password = new_password
                session.commit()
                session.refresh(db_user)
            except IntegrityError:
                raise IntegrityError()
            return db_user

    def get_achievements(self, user_id: int):
        with self.session_factory() as session:
            ids = self.get_by_id(user_id).achievements
            achievements = []
            for id in ids:
                achievements.append(session.query(
                    Achievement).filter(Achievement.id == id).first())
            return achievements
