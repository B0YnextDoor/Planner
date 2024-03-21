from pydantic import BaseModel


class CustomTaskBase(BaseModel):
    group_id: int


class CustomTaskInfo(CustomTaskBase):
    description: str | None
    priority: str | None


class CustomTaskUpd(CustomTaskInfo):
    category: str | None
    task_id: int


class CustomTaskDel(CustomTaskBase):
    group_id: int
    task_id: int
