from pydantic import BaseModel


class CustomTaskInfo(BaseModel):
    description: str
    priority: str
    group_id: int


class CustomTaskUpd(CustomTaskInfo):
    category: str
    task_id: int


class CustomTaskDel(BaseModel):
    group_id: int
    task_id: int
