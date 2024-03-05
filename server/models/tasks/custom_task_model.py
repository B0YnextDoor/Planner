import datetime
from sqlalchemy import ForeignKey, Integer, String, Column, JSON, ARRAY
from sqlalchemy.ext.mutable import MutableDict
from database.database import BaseModel
from sqlalchemy.orm import relationship
from core.config import configs


class CustomTask(BaseModel):
    __tablename__ = "custom_tasks"

    def __init__(self, description: str, priority, group_id):
        self.category = "todo"
        self.description = description
        self.time_created = datetime.datetime.now().isoformat()
        self.priority = priority
        self.group_id = group_id

    category = Column(String, default="todo")
    description = Column(String)
    time_created = Column(String)
    priority = Column(String, default="low")
    group_id = Column(Integer, ForeignKey(
        'custom_tasks_group.id', ondelete="CASCADE", onupdate="CASCADE"))


class CustomTaskGroup(BaseModel):
    __tablename__ = "custom_tasks_group"

    def __init__(self, group_name: str, user_id: int, parent_group_id=-1):
        self.group_name = group_name
        self.user_id = user_id
        self.parent_group_id = parent_group_id
        self.child_group_id = dict()

    group_name = Column(String)
    parent_group_id = Column(Integer, default=-1)
    child_group_id = Column(MutableDict.as_mutable(JSON))
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
    tasks = relationship('CustomTask', backref='user', cascade=configs.CASCADE)
