from sqlalchemy import ARRAY, JSON, Boolean, Integer, String, Column
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.orm import relationship
from database.database import BaseModel
from core.config import configs


class User(BaseModel):
    __tablename__ = "users"

    def __init__(self, name, email, hashed_password):
        self.name = name
        self.email = email
        self.hashed_password = hashed_password
        self.achievements = dict()

    name = Column(String(20))
    email = Column(String(20), unique=True)
    hashed_password = Column(String(20))
    organisation_role = Column(String(5), default="")
    is_pro = Column(Boolean, default=False)
    organisation_id = Column(Integer, default=-1)
    achievements = Column(MutableDict.as_mutable(JSON))

    timer = relationship('models.timer.timer_model.Timer',
                         backref='user', cascade=configs.CASCADE)

    timer_settings = relationship('models.timer.settings_model.TimerSettings',
                                  backref='user', cascade=configs.CASCADE)

    routine = relationship('models.daily_routine.daily_routine_model.DailyRoutine',
                           backref='user', cascade=configs.CASCADE)

    statistics = relationship('models.statistics.statistics_model.UserStatistics',
                              backref='user', cascade=configs.CASCADE)

    notifications = relationship(
        'models.notification.notification_model.Notification', backref='user', cascade=configs.CASCADE)

    todo_tasks = relationship(
        'models.tasks.todo_task_model.TodoTask', backref='user', cascade=configs.CASCADE)

    kanban_tasks = relationship(
        'models.tasks.kanban_task_model.KanbanTask', backref='user', cascade=configs.CASCADE)
    task_groups = relationship(
        'models.tasks.custom_task_model.CustomTaskGroup', backref='user', cascade=configs.CASCADE)
