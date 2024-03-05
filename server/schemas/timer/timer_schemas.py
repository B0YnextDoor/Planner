from pydantic import BaseModel


class TimerSettings(BaseModel):
    work_interval: int
    rest_interval: int
    laps_ammount: int
    access_token: str


class UpdateSession(BaseModel):
    is_completed: bool
    access_token: str


class CurrentSession(UpdateSession):
    current_lap: int
    total_seconds: int
