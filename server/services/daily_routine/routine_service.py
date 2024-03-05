from core.security import decode_token
from repositories.daily_routine.routine_repository import RoutineRepository
from services.base.base_service import BaseService


class RoutineService:
    def __init__(self, routine_repository: RoutineRepository) -> None:
        self.routine_repository = routine_repository

    def get_all(self):
        return self.routine_repository.get_all()

    def get_habits_all(self):
        return self.routine_repository.get_habbits_all()

    def buy_user_pro(self, token: str, pro_code: str):
        return self.routine_repository.buy_user_pro(decode_token(token).get('user'), pro_code)

    def get_user_routine(self, token: str):
        return self.routine_repository.get_user_routine(decode_token(token).get('user'))

    def get_user_habits(self, token: str):
        return self.routine_repository.get_user_habits(decode_token(token).get('user'))

    def create_user_habit(self, token: str, name: str, duration: int, color: str):
        return self.routine_repository.create_user_habit(decode_token(token).get('user'), name, duration, color)

    def get_user_habit(self, token: str, habit_id: int):
        return self.routine_repository.get_user_habit(decode_token(token).get('user'), habit_id)

    def upd_habits_order(self, token: str, order: list[int]):
        return self.routine_repository.upd_habits_order(decode_token(token).get('user'), order)

    def upd_user_routine(self, token: str):
        return self.routine_repository.upd_user_routine(decode_token(token).get('user'))

    def upd_user_habit(self, token: str, id: int, name: str, duration: int, color: str):
        return self.routine_repository.upd_user_habbit(decode_token(token).get('user'), id, name, duration, color)

    def del_user_habit(self, token: str, id: int):
        return self.routine_repository.del_user_habit(decode_token(token).get('user'), id)
