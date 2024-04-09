from sqlalchemy import Column, String
from database.database import BaseModel


class ProCode(BaseModel):
    __tablename__ = 'pro_codes'

    def __init__(self, code: str):
        self.code = code

    code = Column(String)
