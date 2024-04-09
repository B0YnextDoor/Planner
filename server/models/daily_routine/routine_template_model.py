from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database.database import BaseModel
from core.config import configs


class TemplateHabit(BaseModel):
    __tablename__ = "template_habits"

    def __init__(self, name: str, duration: int, color: str, order: int, template_id: int):
        self.name = name
        self.duration = duration
        self.color = color
        self.order = order
        self.template_id = template_id

    name = Column(String)
    duration = Column(Integer, default=60)
    color = Column(String)
    order = Column(Integer, default=999)
    template_id = Column(Integer, ForeignKey(
        'routine_templates.id', ondelete="CASCADE", onupdate="CASCADE"))


class RoutineTemplate(BaseModel):
    __tablename__ = "routine_templates"

    def __init__(self, name: int, sleep_time: int, user_id: int) -> None:
        self.name = f'Template #{name}'
        self.sleep_time = sleep_time
        self.user_id = user_id

    name = Column(String)
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))
    sleep_time = Column(Integer)

    habits = relationship(
        'TemplateHabit', backref='routine_template', cascade=configs.CASCADE)
