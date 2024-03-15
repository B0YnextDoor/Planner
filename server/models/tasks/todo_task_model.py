from sqlalchemy import ForeignKey, Integer, String, Column
from database.database import BaseModel


class TodoTask(BaseModel):
    __tablename__ = "todo_tasks"

    def __init__(self, category: str, description: str | None, due_date: str | None, priority: str | None, user_id: int):
        self.category = category
        self.description = description
        self.due_date = due_date
        self.priority = priority
        self.user_id = user_id

    category = Column(String)
    description = Column(String)
    time_overdue = Column(Integer, default=0)
    due_date = Column(String, default=None)
    priority = Column(String, default=None)
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
