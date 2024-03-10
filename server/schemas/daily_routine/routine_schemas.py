from pydantic import BaseModel


class UpdateOrder(BaseModel):
    order: list[int]  # id of Habits


class RoutineUpdate(BaseModel):
    sleep_time: str


class HabitBase(BaseModel):
    id: int


class HabitUpdate(HabitBase):
    name: str
    duration: int
    color: str


class BuyUserPro(BaseModel):
    pro_code: str
