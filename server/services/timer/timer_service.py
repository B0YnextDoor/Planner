from core.security import decode_token
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
        return self.timer_repository.get_timer_settings(decode_token(token).get('user'))

    def upd_timer_settings(self, work_interval: int, rest_interval: int,
                           laps_ammount: int, token: str):
        return self.timer_repository.upd_timer_settings(work_interval, rest_interval,
                                                        laps_ammount, decode_token(token).get('user'))

    def create_new_session(self, token: str):
        return self.timer_repository.create_timer_session(decode_token(token).get('user'))

    def get_current_round(self, token: str):
        return self.timer_repository.get_current_round(decode_token(token).get('user'))

    def update_session(self, token: str, value: bool):
        return self.timer_repository.upd_timer_session(decode_token(token).get('user'), value)

    def update_round(self, token: str, curr_lap: int, total_seconds: int):
        return self.timer_repository.upd_timer_round(decode_token(token).get('user'), curr_lap, total_seconds)
