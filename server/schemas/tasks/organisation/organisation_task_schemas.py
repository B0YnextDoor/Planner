from schemas.tasks.task_schemas import TaskInfo


class OrganisationTaskInfo(TaskInfo):
    executors: str | None


class OrganisationTaskUpd(OrganisationTaskInfo):
    task_id: int
