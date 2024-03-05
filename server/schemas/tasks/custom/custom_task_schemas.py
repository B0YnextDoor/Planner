from schemas.token.token_schemas import TokenBase


class CustomTaskInfo(TokenBase):
    description: str
    priority: str
    group_id: int


class CustomTaskUpd(CustomTaskInfo):
    category: str
    task_id: int


class CustomTaskDel(TokenBase):
    group_id: int
    task_id: int
