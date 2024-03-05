from schemas.tasks.task_schemas import TaskInfo


class TodoInfo(TaskInfo):
    due_date: str


class TodoUpd(TodoInfo):
    task_id: int
