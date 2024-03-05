from sqlalchemy import Column, ForeignKey, Integer
from database.database import BaseModel


class TimerSettings(BaseModel):

    __tablename__ = "user_timer_settings"

    def __init__(self, user_id: int, work_interval=30, rest_interval=10, laps_ammount=7):
        self.work_interval = work_interval
        self.rest_interval = rest_interval
        self.laps_ammount = laps_ammount
        self.user_id = user_id

    work_interval = Column(Integer, default=30)
    rest_interval = Column(Integer, default=10)
    laps_ammount = Column(Integer, default=7)
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
