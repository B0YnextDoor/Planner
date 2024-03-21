from sqlalchemy import Column, String
from database.database import BaseModel
from sqlalchemy.orm import relationship
from core.config import configs


class Organisation(BaseModel):
    __tablename__ = "organisations"

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    name = Column(String(20), unique=True)
    description = Column(String, default=None)

    statistics = relationship('models.statistics.statistics_model.OrganisationStatistics',
                              backref='organisation', cascade=configs.CASCADE)
    tasks = relationship('models.tasks.organisation_task_model.OrganisationTask',
                         backref='organisation', cascade=configs.CASCADE)
