
from schemas.token.token_schemas import TokenBase


class TaskInfo(TokenBase):
    category: str
    description: str
    priority: str


class DeleteTask(TokenBase):
    task_id: int
