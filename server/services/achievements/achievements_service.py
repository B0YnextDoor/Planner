from core.security import decode_token
from services.base.base_service import BaseService
from repositories.achievements.achievemets_repository import AchievementsRepository


class AchievementsService:
    def __init__(self, achievements_repository: AchievementsRepository) -> None:
        self.achievements_repository = achievements_repository

    def get_all(self):
        return self.achievements_repository.get_all()

    def add_achievement(self, description: str, title: str):
        return self.achievements_repository.add_achievement(description, title)
