from core.security import decode_token
from repositories.daily_routine.routine_repository import RoutineRepository


class RoutineService:
    def __init__(self, routine_repository: RoutineRepository) -> None:
        self.routine_repository = routine_repository

    def get_all(self):
        return self.routine_repository.get_all()

    def get_habits_all(self):
        return self.routine_repository.get_habbits_all()

    def get_user_routine(self, token: str):
        return self.routine_repository.get_user_routine(decode_token(token).get('user'))

    def get_user_habits(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        coll, time = self.routine_repository.get_user_habits(
            user.get('user'))
        if coll is None or type(coll) == str:
            return coll
        habits = []
        for habit in coll:
            habits.append(
                {'id': habit.id, 'name': habit.name, 'duration': habit.duration, 'color': habit.color})
        return {'habits': habits, 'time': time}

    def create_user_habit(self, token: str, name: str, duration: int, color: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.routine_repository.create_user_habit(user.get('user'), name, duration, color)

    def get_user_habit(self, token: str, habit_id: int):
        return self.routine_repository.get_user_habit(decode_token(token).get('user'), habit_id)

    def upd_habits_order(self, token: str, order: list[int]):
        user = decode_token(token)
        if user is None:
            return None
        return self.routine_repository.upd_habits_order(user.get('user'), order)

    def upd_user_routine(self, token: str):
        return self.routine_repository.upd_user_routine(decode_token(token).get('user'))

    def refresh_user_routine(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.routine_repository.refresh_user_routine(user.get('user'))

    def upd_user_habit(self, token: str, id: int, name: str, duration: int, color: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.routine_repository.upd_user_habbit(user.get('user'), id, name, duration, color)

    def del_user_habit(self, token: str, id: int):
        user = decode_token(token)
        if user is None:
            return None
        return self.routine_repository.del_user_habit(user.get('user'), id)
