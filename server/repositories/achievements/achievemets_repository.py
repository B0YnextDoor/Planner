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
                self.add_achievement(achievement.description,
                                     achievement.rules_to_achive, achievement.title)

    def get_all(self):
        with self.session_factory() as session:
            return session.query(Achievement).all()

    def add_achievement(self, description: str, rules_to_achive: str, title: str):
        with self.session_factory() as session:
            try:
                achievment = Achievement(description, rules_to_achive, title)
                session.add(achievment)
                session.commit()
                session.refresh(achievment)
            except IntegrityError:
                raise IntegrityError()
            return achievment

    def add_to_user(self, user_id: int, rule: str):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                achievement = session.query(Achievement).filter(
                    Achievement.rules_to_achive == rule).first()
                if achievement is None:
                    return "no-achivement"
                db_user.achievements[achievement.id] = ""
                session.commit()
                session.refresh(db_user)
            except IntegrityError:
                raise IntegrityError()
            return db_user.achievements
