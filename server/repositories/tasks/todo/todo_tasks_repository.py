from asyncio import log
from contextlib import AbstractContextManager
from datetime import datetime, timedelta
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.tasks.todo_task_model import TodoTask
from models.user.user_model import User


class TodoTaskRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all_todo(self):
        with self.session_factory() as session:
            return session.query(TodoTask).all()

    def get_user_todo(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            todo_tasks = session.query(TodoTask).filter(
                TodoTask.user_id == user_id).all()
            for todo in todo_tasks:
                due_time = datetime.strptime(
                    todo.due_date, "%Y-%m-%dT%H:%M:%S.%fZ")
                print(due_time)
                if todo.category != "finished" and due_time < datetime.now():
                    todo.time_overdue = (
                        datetime.now() - due_time).total_seconds() + 3600
                    todo.category = "overdued"
                    db_user.statistics[0].amount_of_tasks -= 1
                    db_user.statistics[0].overdued_tasks += 1
            session.commit()
            return session.query(TodoTask).filter(TodoTask.user_id == user_id).all()

    def create_todo(self, category: str, description: str, due_date: str,
                    priority: str, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                todo = TodoTask(category, description,
                                due_date, priority, user_id)
                session.add(todo)
                db_user.statistics[0].amount_of_tasks += 1
                session.commit()
                session.refresh(todo)
            except IntegrityError:
                IntegrityError()
            return todo

    def upd_todo(self, category: str, description: str, due_date: str, priority: str, task_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                todo = session.query(TodoTask).filter(
                    TodoTask.user_id == user_id, TodoTask.id == task_id).first()
                if todo is None:
                    return 'no task'
                if category == 'finished':
                    db_user.statistics[0].amount_of_tasks -= 1
                    db_user.statistics[0].finished_tasks += 1
                todo.category = category
                todo.description = description
                todo.due_date = due_date
                todo.priority = priority
                session.commit()
                session.refresh(todo)
            except IntegrityError:
                IntegrityError()
            return todo

    def del_todo(self, user_id: int, task_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                todo = session.query(TodoTask).filter(
                    TodoTask.user_id == user_id, TodoTask.id == task_id).first()
                if todo is None:
                    return 'no task'
                if todo.category == 'finished':
                    db_user.statistics[0].finished_tasks -= 1
                elif todo.category == 'overdued':
                    db_user.statistics[0].overdued_tasks -= 1
                else:
                    db_user.statistics[0].amount_of_tasks -= 1
                session.delete(todo)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return "task deleted"
