from datetime import datetime, timedelta, timezone
from sqlalchemy import ForeignKey, Integer, String, Column
from database.database import BaseModel


class KanbanTask(BaseModel):
    __tablename__ = "kanban_tasks"

    def __init__(self, category: str, description: str | None, priority: str | None, user_id: int):
        self.category = category
        self.description = description
        self.time_created = datetime.now(
            timezone(timedelta(hours=3))).isoformat()
        self.time_spent = 0
        self.priority = priority
        self.user_id = user_id

    category = Column(String)
    description = Column(String)
    time_created = Column(String, default=None)
    time_spent = Column(Integer, default=0)
    priority = Column(String, default=None)
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
