from core.security import decode_token
from repositories.tasks.custom.custom_tasks_repository import CustomTaskRepository


class CustomTaskService:
    def __init__(self, custom_tasks_repository: CustomTaskRepository) -> None:
        self.custom_tasks_repository = custom_tasks_repository

    def get_all(self):
        return self.custom_tasks_repository.get_all()

    def get_user_custom(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.custom_tasks_repository.get_user_custom(user.get('user'))

    def create_custom_task(self, description: str, priority: str, group_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.custom_tasks_repository.create_custom_task(description, priority, group_id,
                                                               user.get('user'))

    def update_custom_task(self, category: str | None, description: str | None, priority: str | None, group_id: int, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.custom_tasks_repository.upd_custom_task(category, description, priority, group_id, task_id,
                                                            user.get('user'))

    def delete_custom_task(self, group_id: int, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.custom_tasks_repository.del_custom_task(user.get('user'), group_id, task_id)
