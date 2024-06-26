from sqlalchemy import Boolean, Column, ForeignKey, Integer
from sqlalchemy.orm import relationship
from database.database import BaseModel
from core.config import configs


class Timer(BaseModel):
    __tablename__ = "timers"

    def __init__(self, user_id: int, is_completed=False):
        self.user_id = user_id
        self.is_completed = is_completed

    is_completed = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))

    rounds = relationship(
        'TimerRound', backref='main_timer', cascade=configs.CASCADE)


class TimerRound(BaseModel):
    __tablename__ = "timer_rounds"

    def __init__(self, timer_id, curr_lap=0, total_work_seconds=30*60, total_rest_seconds=8*60):
        self.timer_id = timer_id
        self.curr_lap = curr_lap
        self.total_work_seconds = total_work_seconds
        self.total_rest_seconds = total_rest_seconds

    total_work_seconds = Column(Integer, default=30*60)
    total_rest_seconds = Column(Integer, default=8*60)
    curr_lap = Column(Integer, default=0)
    timer_id = Column(Integer, ForeignKey(
        'timers.id', ondelete="CASCADE", onupdate="CASCADE"))
