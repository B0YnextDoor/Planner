from sqlalchemy import String, Column
from database.database import BaseModel


class Achievement(BaseModel):
    __tablename__ = "achievements"

    def __init__(self, description: str, rule: str, title: str):
        self.title = title
        self.description = description
        self.rules_to_achive = rule

    description = Column(String, default="text")
    title = Column(String, default="Horay!")
    rules_to_achive = Column(String, default="dance")
