from matplotlib.pyplot import cla
from pydantic import BaseModel


class UpdateOrder(BaseModel):
    order: list[int]  # id of Habits


class RoutineUpdate(BaseModel):
    sleep_time: str


class DeleteHabit(BaseModel):
    id: int


class HabitBase(BaseModel):
    name: str
    duration: int
    color: str | None


class HabitUpdate(HabitBase):
    id: int


class BuyUserPro(BaseModel):
    pro_code: str
