from pydantic import BaseModel


class TaskInfo(BaseModel):
    category: str
    description: str
    priority: str


class DeleteTask(BaseModel):
    task_id: int
