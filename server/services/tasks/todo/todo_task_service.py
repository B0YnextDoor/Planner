from core.security import decode_token
from repositories.tasks.todo.todo_tasks_repository import TodoTaskRepository


class TodoTaskService:
    def __init__(self, todo_tasks_repository: TodoTaskRepository) -> None:
        self.todo_tasks_repository = todo_tasks_repository

    def get_all_todo(self):
        return self.todo_tasks_repository.get_all_todo()

    def get_user_todo(self, token: str):
        return self.todo_tasks_repository.get_user_todo(decode_token(token).get('user'))

    def create_todo(self, category: str, description: str, due_date: str, priority: str, token: str):
        return self.todo_tasks_repository.create_todo(
            category, description, due_date, priority, decode_token(token).get('user'))

    def upd_todo(self, category: str, description: str, due_date: str, priority: str, task_id: int, token: str):
        return self.todo_tasks_repository.upd_todo(category, description, due_date,
                                                   priority, task_id, decode_token(token).get('user'))

    def del_todo(self, task_id: int, token: str):
        return self.todo_tasks_repository.del_todo(decode_token(token).get('user'), task_id)
