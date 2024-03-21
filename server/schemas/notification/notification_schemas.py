from pydantic import BaseModel


class NotificationBase(BaseModel):
    id: int
