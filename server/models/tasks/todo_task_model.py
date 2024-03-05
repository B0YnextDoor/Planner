import datetime
from sqlalchemy import ForeignKey, Integer, String, Column
from database.database import BaseModel


class TodoTask(BaseModel):
    __tablename__ = "todo_tasks"

    def __init__(self, category, description, due_date, priority, user_id):
        self.category = category
        self.description = description
        self.time_created = datetime.datetime.now().isoformat()
        self.due_date = due_date
        self.priority = priority
        self.user_id = user_id

    category = Column(String)
    description = Column(String)
    time_created = Column(String)
    time_overdue = Column(Integer, default="")
    due_date = Column(String)
    priority = Column(String, default="low")
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
