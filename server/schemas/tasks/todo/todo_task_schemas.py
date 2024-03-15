from schemas.tasks.task_schemas import TaskInfo


class TodoInfo(TaskInfo):
    due_date: str | None


class TodoUpd(TodoInfo):
    task_id: int
