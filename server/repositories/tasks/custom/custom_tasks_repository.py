from contextlib import AbstractContextManager
from datetime import datetime
from operator import concat
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

    def get_user_custom(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            elif len(db_user.task_groups) == 0:
                return 'no groups'
            task_groups = session.query(CustomTaskGroup).filter(
                CustomTaskGroup.user_id == user_id).all()
            tasks = []
            for group in task_groups:
                tasks = concat(tasks, group.tasks)
            return tasks

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
                if (db_user.statistics[0].amount_of_tasks == 10 and 4 not in db_user.achievements):
                    db_user.achievements[4] = ""
                if (db_user.statistics[0].amount_of_tasks == 50 and 5 not in db_user.achievements):
                    db_user.achievements[5] = ""
                session.commit()
                session.refresh(custom_task)
            except IntegrityError:
                raise IntegrityError()
            return 'Task created'

    def upd_custom_task(self, category: str | None, description: str | None, priority: str | None, group_id: int, task_id: int,
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
                elif task.category == 'finished' and category is not None:
                    db_user.statistics[0].finished_tasks -= 1
                    db_user.statistics[0].amount_of_tasks += 1
                if (db_user.statistics[0].finished_tasks == 1 and 6 not in db_user.achievements):
                    db_user.achievements[6] = ""
                if (db_user.statistics[0].finished_tasks == 10 and 7 not in db_user.achievements):
                    db_user.achievements[7] = ""
                if (db_user.statistics[0].finished_tasks == 50 and 8 not in db_user.achievements):
                    db_user.achievements[8] = ""
                if category is not None:
                    task.category = category
                if description is not None:
                    task.description = description
                if priority is not None:
                    task.priority = priority
                task.group_id = group_id
                session.commit()
                session.refresh(task)
            except IntegrityError:
                raise IntegrityError()
            return 'Task updated'

    def del_custom_task(self, user_id: int, group_id: int, task_id: int):
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
                if task.category != 'finished':
                    db_user.statistics[0].amount_of_tasks -= 1
                session.delete(task)
                session.commit()
            except IntegrityError:
                raise IntegrityError()
            return "Task deleted"
