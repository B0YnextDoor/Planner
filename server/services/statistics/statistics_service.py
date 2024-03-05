from core.security import decode_token
from services.base.base_service import BaseService
from repositories.statistics.statistics_repository import StatisticsRepository


class StatisticsService:
    def __init__(self, statistics_repository: StatisticsRepository) -> None:
        self.statistics_repository = statistics_repository

    def get_all_user_stat(self):
        return self.statistics_repository.get_all_user_stat()

    def get_all_organisation_stat(self):
        return self.statistics_repository.get_all_organisation_stat()

    def get_user_stat(self, token: str):
        return self.statistics_repository.get_user_stat(decode_token(token).get('user'))

    def get_organisation_stat(self, token: str):
        return self.statistics_repository.get_organisation_stat(decode_token(token).get('user'))

    def upd_user_stat(self, token: str, amount_of_tasks: int, finished_tasks: int, overdued_tasks: int):
        return self.statistics_repository.upd_user_stat(amount_of_tasks, finished_tasks,
                                                        overdued_tasks, decode_token(token).get('user'))

    def upd_organisation_stat(self, token: str, amount_of_tasks: int, finished_tasks: int):
        return self.statistics_repository.upd_organisation_stat(amount_of_tasks,
                                                                finished_tasks, decode_token(token).get('user'))
