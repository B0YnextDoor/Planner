from pydantic import BaseModel


class UpdateOrder(BaseModel):
    order: list[int]  # id of Habits


class RoutineTemplate(BaseModel):
    time: int
    habits: list[int]


class UpdateTemplate(BaseModel):
    name: str
    template_id: int


class UpdateTemplateHabits(RoutineTemplate):
    template_id: int


class RoutineTemplateId(BaseModel):
    template_id: int


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
