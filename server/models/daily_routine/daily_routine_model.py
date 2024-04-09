from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database.database import BaseModel
from core.config import configs


class Habit(BaseModel):
    __tablename__ = "habits"

    def __init__(self, name: str, duration: int, color: str, routine_id: int, order: int = 999):
        self.name = name
        self.duration = duration
        self.color = color
        self.routine_id = routine_id
        self.order = order

    name = Column(String)
    duration = Column(Integer, default=60)
    color = Column(String)
    order = Column(Integer, default=999)
    routine_id = Column(Integer, ForeignKey(
        'daily_routine.id', ondelete="CASCADE", onupdate="CASCADE"))


class DailyRoutine(BaseModel):
    __tablename__ = "daily_routine"

    def __init__(self, user_id: int) -> None:
        self.user_id = user_id
        self.sleep_time = 1440

    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
    sleep_time = Column(Integer, default=1440)

    habits = relationship(
        'Habit', backref='daily_routine', cascade=configs.CASCADE)
