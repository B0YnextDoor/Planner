from core.security import decode_token
from repositories.tasks.kanban.kanban_tasks_repository import KanbanTaskRepository


class KanbanTaskService:
    def __init__(self, kanban_tasks_repository: KanbanTaskRepository) -> None:
        self.kanban_tasks_repository = kanban_tasks_repository

    def get_all_kanban(self):
        return self.kanban_tasks_repository.get_all_kanban()

    def get_user_kanban(self, token: str):
        return self.kanban_tasks_repository.get_user_kanban(decode_token(token).get('user'))

    def create_kanban(self, category: str, description: str, priority: str, token: str):
        return self.kanban_tasks_repository.create_kanban(
            category, description, priority, decode_token(token).get('user'))

    def upd_kanban(self, category: str, description: str, priority: str, task_id: int, token: str):
        return self.kanban_tasks_repository.upd_kanban(category, description,
                                                       priority, task_id, decode_token(token).get('user'))

    def del_kanban(self, task_id: int, token: str):
        return self.kanban_tasks_repository.del_kanban(decode_token(token).get('user'), task_id)
