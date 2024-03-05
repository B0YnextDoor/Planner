from sqlalchemy import Column, ForeignKey, Integer
from database.database import BaseModel


class UserStatistics(BaseModel):
    __tablename__ = "user_statistics"

    def __init__(self, user_id, amount_of_tasks=0, finished_tasks=0, overdued_tasks=0):
        self.user_id = user_id
        self.amount_of_tasks = amount_of_tasks
        self.finished_tasks = finished_tasks
        self.overdued_tasks = overdued_tasks

    amount_of_tasks = Column(Integer, default=0)
    finished_tasks = Column(Integer, default=0)
    overdued_tasks = Column(Integer, default=0)
    user_id = Column(Integer, ForeignKey(
        'users.id', ondelete="CASCADE", onupdate="CASCADE"))


class OrganisationStatistics(BaseModel):
    __tablename__ = "organisation_statistics"

    def __init__(self, organisation_id, amount_of_tasks=0, finished_tasks=0):
        self.organisation_id = organisation_id
        self.amount_of_tasks = amount_of_tasks
        self.finished_tasks = finished_tasks

    amount_of_tasks = Column(Integer, default=0)
    finished_tasks = Column(Integer, default=0)
    organisation_id = Column(Integer, ForeignKey(
        'organisations.id', ondelete="CASCADE", onupdate="CASCADE"))
