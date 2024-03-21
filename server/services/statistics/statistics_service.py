from core.security import decode_token
from repositories.statistics.statistics_repository import StatisticsRepository


class StatisticsService:
    def __init__(self, statistics_repository: StatisticsRepository) -> None:
        self.statistics_repository = statistics_repository

    def get_all_user_stat(self):
        return self.statistics_repository.get_all_user_stat()

    def get_all_organisation_stat(self):
        return self.statistics_repository.get_all_organisation_stat()

    def get_user_stat(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.statistics_repository.get_user_stat(user.get('user'))
        if response is None or type(response) == str:
            return response
        return {'ammount_of_tasks': response.amount_of_tasks,
                'finished_tasks': response.finished_tasks,
                'overdued_tasks': response.overdued_tasks}

    def get_organisation_stat(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.statistics_repository.get_organisation_stat(
            user.get('user'))
        if response is None or type(response) == str:
            return response
        return {'ammount_of_tasks': response.amount_of_tasks,
                'finished_tasks': response.finished_tasks}

    def upd_user_stat(self, token: str, amount_of_tasks: int, finished_tasks: int, overdued_tasks: int):
        user = decode_token(token)
        return self.statistics_repository.upd_user_stat(amount_of_tasks, finished_tasks,
                                                        overdued_tasks, user.get('user')) if user is not None else None

    def upd_organisation_stat(self, token: str, amount_of_tasks: int, finished_tasks: int):
        user = decode_token(token)
        return self.statistics_repository.upd_organisation_stat(amount_of_tasks,
                                                                finished_tasks, user.get('user')) if user is not None else None
