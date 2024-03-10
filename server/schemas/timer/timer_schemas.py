from pydantic import BaseModel


class RoundInfo(BaseModel):
    work_interval: int
    rest_interval: int


class TimerSettings(RoundInfo):
    laps_ammount: int


class UpdateSession(BaseModel):
    is_completed: bool


class CurrentSession(UpdateSession):
    current_lap: int
    total_work_seconds: int
    total_rest_seconds: int
