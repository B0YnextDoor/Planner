from core.security import decode_token
from schemas.timer.timer_schemas import TimerSettings
from repositories.timer.timer_repository import TimerRepository
from services.base.base_service import BaseService


class TimerService(BaseService):
    def __init__(self, timer_repository: TimerRepository) -> None:
        self.timer_repository = timer_repository

    def get_sessions(self):
        return self.timer_repository.get_sessions()

    def get_rounds(self):
        return self.timer_repository.get_rounds()

    def get_timer_settings(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        settings = self.timer_repository.get_timer_settings(user.get('user'))
        return TimerSettings(work_interval=settings.work_interval, rest_interval=settings.rest_interval, laps_ammount=settings.laps_ammount) if settings is not None else None

    def upd_timer_settings(self, work_interval: int, rest_interval: int,
                           laps_ammount: int, token: str):
        user = decode_token(token)
        return self.timer_repository.upd_timer_settings(work_interval, rest_interval,
                                                        laps_ammount, user.get('user')) if user is not None else None

    def create_new_session(self, token: str):
        user = decode_token(token)
        return self.timer_repository.create_timer_session(user.get('user')) if user is not None else None

    def get_current_round(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.timer_repository.get_current_round(user.get('user'))
        if response is None or type(response) == str:
            return response
        return {'current_lap': response.curr_lap,
                'total_work_seconds': response.total_work_seconds,
                'total_rest_seconds': response.total_rest_seconds}

    def update_session(self, token: str, value: bool):
        user = decode_token(token)
        return self.timer_repository.upd_timer_session(user.get('user'), value) if user is not None else None

    def update_round(self, token: str, curr_lap: int, total_work_seconds: int, total_rest_seconds: int):
        user = decode_token(token)
        return self.timer_repository.upd_timer_round(user.get('user'),
                                                     curr_lap, total_work_seconds,
                                                     total_rest_seconds) if user is not None else None
