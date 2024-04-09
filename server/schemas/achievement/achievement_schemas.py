from pydantic import BaseModel


class Achievement(BaseModel):
    description: str
    title: str
