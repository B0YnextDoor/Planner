from contextlib import AbstractContextManager
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from utils.achievements_const import db_achievements
from models.achievements.achievements_model import Achievement
from models.user.user_model import User


class AchievementsRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory
        with session_factory() as session:
            achievements = session.query(Achievement).all()
            if achievements is not None and len(achievements) > 0:
                return None
            for achievement in db_achievements:
                self.add_achievement(
                    achievement.description, achievement.title)

    def get_all(self):
        with self.session_factory() as session:
            return session.query(Achievement).all()

    def add_achievement(self, description: str, title: str):
        with self.session_factory() as session:
            try:
                achievment = Achievement(description, title)
                session.add(achievment)
                session.commit()
                session.refresh(achievment)
            except IntegrityError:
                raise IntegrityError()
            return None
