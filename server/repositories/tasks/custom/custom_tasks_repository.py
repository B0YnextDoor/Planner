from contextlib import AbstractContextManager
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.tasks.custom_task_model import CustomTask, CustomTaskGroup
from models.user.user_model import User


class CustomTaskRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all(self):
        with self.session_factory() as session:
            return session.query(CustomTask).all()

    def get_user_custom(self, user_id: int, group_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            elif len(db_user.task_groups) == 0:
                return 'no groups'
            task_group = session.query(CustomTaskGroup).filter(CustomTaskGroup.id == group_id,
                                                               CustomTaskGroup.user_id == user_id).first()
            return task_group.tasks if task_group is not None else 'no group'

    def create_custom_task(self, description: str, priority: str, group_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif len(db_user.task_groups) == 0:
                    return 'no groups'
                if session.query(CustomTaskGroup).filter(CustomTaskGroup.id == group_id,
                                                         CustomTaskGroup.user_id == user_id).first() is None:
                    return 'no group'
                custom_task = CustomTask(description, priority, group_id)
                session.add(custom_task)
                db_user.statistics[0].amount_of_tasks += 1
                session.commit()
                session.refresh(custom_task)
            except IntegrityError:
                raise IntegrityError()
            return custom_task

    def upd_custom_task(self, category: str, description: str, priority: str, group_id: int, task_id: int,
                        user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif len(db_user.task_groups) == 0:
                    return 'no groups'
                if session.query(CustomTaskGroup).filter(CustomTaskGroup.id == group_id,
                                                         CustomTaskGroup.user_id == user_id).first() is None:
                    return 'no group'
                task = session.query(CustomTask).filter(CustomTask.id == task_id,
                                                        CustomTask.group_id == group_id).first()
                if task is None:
                    return 'no task'
                if category == 'finished':
                    db_user.statistics[0].amount_of_tasks -= 1
                    db_user.statistics[0].finished_tasks += 1
                task.category = category
                task.description = description
                task.priority = priority
                task.group_id = group_id
                session.commit()
                session.refresh(task)
            except IntegrityError:
                raise IntegrityError()
            return task

    def del_custom_task(self, user_id, group_id, task_id):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif len(db_user.task_groups) == 0:
                    return 'no groups'
                if session.query(CustomTaskGroup).filter(CustomTaskGroup.id == group_id,
                                                         CustomTaskGroup.user_id == user_id).first() is None:
                    return 'no group'
                task = session.query(CustomTask).filter(CustomTask.id == task_id,
                                                        CustomTask.group_id == group_id).first()
                if task is None:
                    return 'no task'
                if task.category == 'finished':
                    db_user.statistics[0].finished_tasks -= 1
                else:
                    db_user.statistics[0].amount_of_tasks -= 1
                session.delete(task)
                session.commit()
            except IntegrityError:
                raise IntegrityError()
            return "task deleted"
