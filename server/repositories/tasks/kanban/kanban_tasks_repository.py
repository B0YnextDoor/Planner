from contextlib import AbstractContextManager
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.tasks.kanban_task_model import KanbanTask
from models.user.user_model import User


class KanbanTaskRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all_kanban(self):
        with self.session_factory() as session:
            return session.query(KanbanTask).all()

    def get_user_kanban(self, user_id: int):
        with self.session_factory() as session:
            return session.query(KanbanTask).filter(KanbanTask.user_id == user_id).all()

    def create_kanban(self, category: str, description: str, priority: str, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                kanban = KanbanTask(category, description, priority, user_id)
                session.add(kanban)
                db_user.statistics[0].amount_of_tasks += 1
                session.commit()
                session.refresh(kanban)
            except IntegrityError:
                IntegrityError()
            return kanban

    def upd_kanban(self, category: str, description: str, priority: str, task_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                kanban = session.query(KanbanTask).filter(
                    KanbanTask.user_id == user_id, KanbanTask.id == task_id).first()
                if kanban is None:
                    return 'no task'
                if category == 'DONE':
                    db_user.statistics[0].amount_of_tasks -= 1
                    db_user.statistics[0].finished_tasks += 1
                    kanban.time_spent = (datetime.now(
                    ) - datetime.fromisoformat(kanban.time_created)).total_seconds()
                kanban.category = category
                kanban.description = description
                kanban.priority = priority
                session.commit()
                session.refresh(kanban)
            except IntegrityError:
                IntegrityError()
            return kanban

    def del_kanban(self, user_id: int, task_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                kanban = session.query(KanbanTask).filter(
                    KanbanTask.user_id == user_id, KanbanTask.id == task_id).first()
                if kanban is None:
                    return 'no task'
                if kanban.category == 'DONE':
                    db_user.statistics[0].finished_tasks -= 1
                else:
                    db_user.statistics[0].amount_of_tasks -= 1
                session.delete(kanban)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return "task deleted"
