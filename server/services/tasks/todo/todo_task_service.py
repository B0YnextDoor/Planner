from core.security import decode_token
from repositories.tasks.todo.todo_tasks_repository import TodoTaskRepository


class TodoTaskService:
    def __init__(self, todo_tasks_repository: TodoTaskRepository) -> None:
        self.todo_tasks_repository = todo_tasks_repository

    def get_all_todo(self):
        return self.todo_tasks_repository.get_all_todo()

    def get_user_todo(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.todo_tasks_repository.get_user_todo(
            user.get('user'))
        todos = []
        for task in response:
            todos.append({'task_id': task.id, 'category': task.category, 'description': task.description,
                          'due_date': task.due_date, 'time_overdue': task.time_overdue, 'priority': task.priority, 'isCompleted': task.category == 'finished'})
        return todos

    def create_todo(self, category: str, description: str | None, due_date: str | None, priority: str | None, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.todo_tasks_repository.create_todo(
            category, description, due_date, priority, user.get('user'))

    def upd_todo(self, category: str, description: str, due_date: str | None, priority: str | None, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.todo_tasks_repository.upd_todo(category, description, due_date,
                                                   priority, task_id, user.get('user'))

    def del_todo(self, task_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.todo_tasks_repository.del_todo(user.get('user'), task_id)
