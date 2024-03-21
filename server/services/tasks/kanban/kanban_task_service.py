from core.security import decode_token
from repositories.tasks.kanban.kanban_tasks_repository import KanbanTaskRepository


class KanbanTaskService:
    def __init__(self, kanban_tasks_repository: KanbanTaskRepository) -> None:
        self.kanban_tasks_repository = kanban_tasks_repository

    def get_all_kanban(self):
        return self.kanban_tasks_repository.get_all_kanban()

    def get_user_kanban(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.kanban_tasks_repository.get_user_kanban(
            user.get('user'))
        tasks = []
        for task in response:
            tasks.append({'task_id': task.id, 'category': task.category, 'description': task.description,
                          'priority': task.priority, 'isCompleted': task.category == 'done', 'time_created': task.time_created,
                          'time_spent': task.time_spent})
        return tasks

    def create_kanban(self, category: str, description: str | None, priority: str | None, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.kanban_tasks_repository.create_kanban(
            category, description, priority, user.get('user'))

    def upd_kanban(self, category: str, description: str | None, priority: str | None, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.kanban_tasks_repository.upd_kanban(category, description,
                                                       priority, task_id, user.get('user'))

    def del_kanban(self, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.kanban_tasks_repository.del_kanban(user.get('user'), task_id)
