from sqlalchemy import String, Column
from database.database import BaseModel


class Achievement(BaseModel):
    __tablename__ = "achievements"

    def __init__(self, description: str, title: str):
        self.title = title
        self.description = description

    description = Column(String)
    title = Column(String)
