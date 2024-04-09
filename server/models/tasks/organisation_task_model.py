from datetime import datetime, timezone, timedelta
from sqlalchemy import ForeignKey, Integer, String, Column
from database.database import BaseModel


class OrganisationTask(BaseModel):
    __tablename__ = "organisation_tasks"

    def __init__(self, category, description, priority, organisation_id):
        self.category = category
        self.description = description
        self.time_created = datetime.now(timezone(
            timedelta(hours=3))).isoformat()
        self.time_spent = 0
        self.priority = priority
        self.organisation_id = organisation_id

    category = Column(String)
    description = Column(String)
    time_created = Column(String)
    time_spent = Column(Integer, default=0)
    priority = Column(String, default=None)
    executors = Column(String, default=None)
    organisation_id = Column(Integer, ForeignKey(
        'organisations.id', ondelete="CASCADE", onupdate="CASCADE"))
