from core.security import decode_token
from repositories.notification.notification_repository import NotificationRepository


class NotificationService:
    def __init__(self, notification_repository: NotificationRepository) -> None:
        self.notification_repository = notification_repository

    def get_all(self):
        return self.notification_repository.get_all()

    def get_user_notifications(self, token: str):
        return self.notification_repository.get_user_notifications(decode_token(token).get('user'))
