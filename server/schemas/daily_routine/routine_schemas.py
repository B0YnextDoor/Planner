from schemas.token.token_schemas import TokenBase


class UpdateOrder(TokenBase):
    order: list[int]  # id of Habits


class RoutineUpdate(TokenBase):
    sleep_time: str


class HabitBase(TokenBase):
    id: int


class HabitUpdate(HabitBase):
    name: str
    duration: int
    color: str


class BuyUserPro(TokenBase):
    pro_code: str
