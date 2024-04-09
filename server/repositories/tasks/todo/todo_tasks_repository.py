from contextlib import AbstractContextManager
from datetime import datetime, timedelta, timezone
from urllib import response
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.tasks.todo_task_model import TodoTask
from models.user.user_model import User
from repositories.neural_net.neural_net import NeuralNet


class TodoTaskRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory
        self.net = NeuralNet()

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
                due_time = datetime.fromisoformat(todo.due_date)
                if todo.category != "overdued" and todo.category != "finished" \
                        and due_time + timedelta(days=1) < datetime.now(timezone(timedelta(hours=3))):
                    todo.time_overdue = (
                        datetime.now(timezone(timedelta(hours=3))) - due_time).total_seconds() + 3600
                    todo.category = "overdued"
                    todo.priority = 'high'
                    db_user.statistics[0].amount_of_tasks -= 1
                    db_user.statistics[0].overdued_tasks += 1
            session.commit()
            return session.query(TodoTask).filter(TodoTask.user_id == user_id).all()

    def create_todo(self, category: str, description: str, due_date: str | None,
                    priority: str | None, user_id: int):
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
                if (db_user.statistics[0].amount_of_tasks == 10 and 4 not in db_user.achievements):
                    db_user.achievements[4] = ""
                if (db_user.statistics[0].amount_of_tasks == 50 and 5 not in db_user.achievements):
                    db_user.achievements[5] = ""
                session.commit()
                session.refresh(todo)
                response = ['Task created']
                if (due_date is None):
                    return response
                todos = session.query(TodoTask).filter(
                    TodoTask.due_date == due_date, TodoTask.id != todo.id).all()
                mtodos = len([t for t in todos if t.priority == 'medium'])
                htodos = len([t for t in todos if t.priority == 'high'])
                ltodos = len(todos) - mtodos - htodos
                otodos = len(session.query(TodoTask).filter(
                    TodoTask.category == 'overdued').all())
                next_todos = session.query(TodoTask).filter(
                    TodoTask.due_date > due_date).all()
                response.extend(self.net.getDate(
                    [len(todos), ltodos, mtodos, htodos, otodos], due_date, next_todos))
            except IntegrityError:
                IntegrityError()
            return response

    def upd_todo(self, category: str, description: str | None, due_date: str | None, priority: str | None, task_id: int, user_id: int):
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
                if category == 'finished' and todo.category != 'finished':
                    db_user.statistics[0].finished_tasks += 1
                    if todo.category == 'overdued':
                        db_user.statistics[0].overdued_tasks -= 1
                    else:
                        db_user.statistics[0].amount_of_tasks -= 1
                elif category != 'overdued' and (todo.category == 'finished' or todo.category == 'overdued'):
                    db_user.statistics[0].amount_of_tasks += 1
                    if todo.category == 'overdued':
                        db_user.statistics[0].overdued_tasks -= 1
                    else:
                        db_user.statistics[0].finished_tasks -= 1
                print(db_user.statistics)
                if (db_user.statistics[0].finished_tasks == 1 and 6 not in db_user.achievements):
                    db_user.achievements[6] = ""
                if (db_user.statistics[0].finished_tasks == 10 and 7 not in db_user.achievements):
                    db_user.achievements[7] = ""
                if (db_user.statistics[0].finished_tasks == 50 and 8 not in db_user.achievements):
                    db_user.achievements[8] = ""
                session.commit()
                session.refresh(db_user)
                todo.category = category
                if (description is not None):
                    todo.description = description
                if (due_date is not None):
                    todo.due_date = due_date
                if (priority is not None):
                    todo.priority = priority
                session.commit()
                session.refresh(todo)
                response = ['Task updated']
                if (todo.due_date is None):
                    return response
                todos = session.query(TodoTask).filter(
                    TodoTask.due_date == todo.due_date).all()
                mtodos = len([t for t in todos if t.priority == 'medium'])
                htodos = len([t for t in todos if t.priority == 'high'])
                ltodos = len(todos) - mtodos - htodos
                otodos = len(session.query(TodoTask).filter(
                    TodoTask.category == 'overdued').all())
                next_todos = session.query(TodoTask).filter(
                    TodoTask.due_date > due_date).all()
                response.extend(self.net.getDate(
                    [len(todos), ltodos, mtodos, htodos, otodos], due_date, next_todos))
            except IntegrityError:
                IntegrityError()
            return response

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
                if todo.category == "overdued":
                    db_user.statistics[0].overdued_tasks -= 1
                elif todo.category != "finished":
                    db_user.statistics[0].amount_of_tasks -= 1
                session.delete(todo)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return "task deleted"
