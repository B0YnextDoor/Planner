from contextlib import AbstractContextManager
from typing import Callable
from sqlalchemy.orm import Session

from models.notification.notification_model import Notification
from models.user.user_model import User


class NotificationRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all(self):
        with self.session_factory() as session:
            return session.query(Notification).all()

    def get_user_notifications(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            return db_user.notifications if db_user is not None else None
