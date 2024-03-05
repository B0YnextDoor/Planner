import datetime
from sqlalchemy import ForeignKey, Integer, String, Column, ARRAY, JSON
from sqlalchemy.ext.mutable import MutableDict
from database.database import BaseModel


class OrganisationTask(BaseModel):
    __tablename__ = "organisation_tasks"

    def __init__(self, category, description, priority, organisation_id):
        self.category = category
        self.description = description
        self.time_created = datetime.datetime.now().isoformat()
        self.time_spent = 0
        self.executors = dict()
        self.priority = priority
        self.organisation_id = organisation_id

    category = Column(String)
    description = Column(String)
    time_created = Column(String)
    time_spent = Column(Integer, default=0)
    priority = Column(String, default="low")
    executors = Column(MutableDict.as_mutable(JSON))
    organisation_id = Column(Integer, ForeignKey(
        'organisations.id', ondelete="CASCADE", onupdate="CASCADE"))
