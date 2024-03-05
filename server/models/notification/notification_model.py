from sqlalchemy import Column, ForeignKey, Integer, String
from database.database import BaseModel


class Notification(BaseModel):
    __tablename__ = "notifications"

    def __init__(self, type: str, payload: str, user_id: int):
        self.type = type
        self.payload = payload
        self.user_id = user_id

    type = Column(String)
    payload = Column(String, default="")
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
