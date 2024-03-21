from sqlalchemy import Column, ForeignKey, Integer, String
from database.database import BaseModel


class Notification(BaseModel):
    __tablename__ = "notifications"

    def __init__(self, msg: str, user_id: int, payload: str = ''):
        self.message = msg
        self.payload = payload
        self.user_id = user_id

    message = Column(String)
    payload = Column(String, default="")
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
