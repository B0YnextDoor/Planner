from pydantic import BaseModel


class TaskInfo(BaseModel):
    category: str
    description: str | None
    priority: str | None


class DeleteTask(BaseModel):
    task_id: int
