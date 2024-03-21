from core.security import decode_token
from repositories.tasks.organisation.organisation_tasks_repository import OrganisationTaskRepository


class OrganisationTaskService:
    def __init__(self, organisation_tasks_repository: OrganisationTaskRepository) -> None:
        self.organisation_tasks_repository = organisation_tasks_repository

    def get_all(self):
        return self.organisation_tasks_repository.get_all()

    def get_organisation_tasks(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.organisation_tasks_repository.get_organisation_tasks(
            user.get('user'))
        if response is None or type(response) == str:
            return response
        tasks = []
        for task in response:
            tasks.append({'task_id': task.id, 'category': task.category, 'description': task.description,
                          'priority': task.priority, 'isCompleted': task.category == 'done',
                          'time_created': task.time_created,
                          'executors': task.executors,
                          'time_spent': task.time_spent})
        return tasks

    def create_organisation_task(self, category: str, description: str, priority: str,
                                 executors: str, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_tasks_repository.create_organisation_task(
            category, description, priority, executors, user.get('user'))

    def upd_organisation_task(self, category: str, description: str | None, priority: str | None,
                              executors: str | None, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_tasks_repository.upd_organisation_task(category, description,
                                                                        priority, executors, task_id,
                                                                        user.get('user'))

    def del_organisation_task(self, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_tasks_repository.del_organisation_task(user.get('user'), task_id)
