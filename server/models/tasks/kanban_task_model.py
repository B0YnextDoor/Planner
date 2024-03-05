import datetime
from sqlalchemy import ForeignKey, Integer, String, Column
from database.database import BaseModel


class KanbanTask(BaseModel):
    __tablename__ = "kanban_tasks"

    def __init__(self, category, description, priority, user_id):
        self.category = category
        self.description = description
        self.time_created = datetime.datetime.now().isoformat()
        self.time_spent = 0
        self.priority = priority
        self.user_id = user_id

    category = Column(String)
    description = Column(String)
    time_created = Column(String)
    time_spent = Column(Integer, default=0)
    priority = Column(String, default="low")
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
