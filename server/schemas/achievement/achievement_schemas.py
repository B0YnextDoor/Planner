from pydantic import BaseModel


class AchievementBase(BaseModel):
    rules_to_achive: str


class AchievementFull(AchievementBase):
    description: str
    title: str
