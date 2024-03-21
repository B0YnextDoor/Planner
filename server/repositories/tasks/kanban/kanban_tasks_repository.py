from contextlib import AbstractContextManager
from datetime import datetime, timedelta, timezone
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
                if (db_user.statistics[0].amount_of_tasks == 10 and 4 not in db_user.achievements):
                    db_user.achievements[4] = ""
                if (db_user.statistics[0].amount_of_tasks == 50 and 5 not in db_user.achievements):
                    db_user.achievements[5] = ""
                session.commit()
                session.refresh(kanban)
            except IntegrityError:
                IntegrityError()
            return 'Task created'

    def upd_kanban(self, category: str, description: str | None, priority: str | None, task_id: int, user_id: int):
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
                if category == 'done' and kanban.category != 'done':
                    db_user.statistics[0].amount_of_tasks -= 1
                    db_user.statistics[0].finished_tasks += 1
                    kanban.time_spent = (datetime.now(timezone(
                        timedelta(hours=3))) - datetime.fromisoformat(kanban.time_created)).total_seconds() + 1
                elif kanban.category == 'done':
                    kanban.time_spent = 0
                    db_user.statistics[0].amount_of_tasks += 1
                    db_user.statistics[0].finished_tasks -= 1
                elif category == 'in process':
                    kanban.time_created = datetime.now(
                        timezone(timedelta(hours=3))).isoformat()
                if (db_user.statistics[0].finished_tasks == 1 and 6 not in db_user.achievements):
                    db_user.achievements[6] = ""
                if (db_user.statistics[0].finished_tasks == 10 and 7 not in db_user.achievements):
                    db_user.achievements[7] = ""
                if (db_user.statistics[0].finished_tasks == 50 and 8 not in db_user.achievements):
                    db_user.achievements[8] = ""
                kanban.category = category
                if description is not None:
                    kanban.description = description
                if priority is not None:
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
                if kanban.category != 'done':
                    db_user.statistics[0].amount_of_tasks -= 1
                session.delete(kanban)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return "task deleted"
