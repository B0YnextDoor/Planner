from schemas.tasks.task_schemas import TaskInfo


class OrganisationTaskInfo(TaskInfo):
    executors: list[int]


class OrganisationTaskUpd(OrganisationTaskInfo):
    task_id: int
