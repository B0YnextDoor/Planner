from core.security import decode_token
from repositories.tasks.organisation.organisation_tasks_repository import OrganisationTaskRepository


class OrganisationTaskService:
    def __init__(self, organisation_tasks_repository: OrganisationTaskRepository) -> None:
        self.organisation_tasks_repository = organisation_tasks_repository

    def get_all(self):
        return self.organisation_tasks_repository.get_all()

    def get_organisation_tasks(self, token: str):
        return self.organisation_tasks_repository.get_organisation_tasks(decode_token(token).get('user'))

    def create_organisation_task(self, category: str, description: str, priority: str,
                                 executors: list[int], token: str):
        return self.organisation_tasks_repository.create_organisation_task(
            category, description, priority, executors, decode_token(token).get('user'))

    def upd_organisation_task(self, category: str, description: str, priority: str,
                              executors: list[int], task_id: int, token: str):
        return self.organisation_tasks_repository.upd_organisation_task(category, description,
                                                                        priority, executors, task_id,
                                                                        decode_token(token).get('user'))

    def del_organisation_task(self, task_id: int, token: str):
        return self.organisation_tasks_repository.del_organisation_task(decode_token(token).get('user'), task_id)
