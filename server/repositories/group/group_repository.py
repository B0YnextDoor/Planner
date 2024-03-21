from contextlib import AbstractContextManager
from operator import concat
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.tasks.custom_task_model import CustomTaskGroup
from models.user.user_model import User


class CustomTaskGroupRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all(self):
        with self.session_factory() as session:
            return session.query(CustomTaskGroup).all()

    def get_user_groups(self, user_id: int, parent_id: int):
        with self.session_factory() as session:
            groups = session.query(CustomTaskGroup).filter(
                CustomTaskGroup.user_id == user_id, CustomTaskGroup.parent_group_id == parent_id).all()
            response = []
            for group in groups:
                response.append(
                    {'id': group.id, 'text': group.group_name, 'parent': group.parent_group_id, 'droppable': True})
                response = concat(
                    response, self.get_user_groups(user_id, group.id))
            return response

    def create_user_group(self, group_name: str, parent_group_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                parent_group = session.query(CustomTaskGroup).filter(
                    CustomTaskGroup.id == parent_group_id, CustomTaskGroup.user_id == user_id).first()
                if parent_group_id != -1 and parent_group is None:
                    return 'no-parent'
                new_group = CustomTaskGroup(
                    group_name, user_id, -1 if parent_group is None else parent_group.id)
                session.add(new_group)
                session.commit()
                session.refresh(new_group)
            except IntegrityError:
                IntegrityError()
            return "Group created"

    def upd_user_group(self, group_name: str | None, parent_group_id: int, group_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                parent_group = session.query(CustomTaskGroup).filter(
                    CustomTaskGroup.id == parent_group_id, CustomTaskGroup.user_id == user_id).first()
                if parent_group_id != -1 and parent_group is None:
                    return 'no-parent'
                group = session.query(CustomTaskGroup).filter(CustomTaskGroup.id == group_id,
                                                              CustomTaskGroup.user_id == user_id).first()
                if group is None:
                    return 'no group'
                if group_name is not None:
                    group.group_name = group_name
                group.parent_group_id = parent_group_id
                session.commit()
                session.refresh(group)
            except IntegrityError:
                IntegrityError()
            return 'Group udpated'

    def del_user_group(self, group_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif len(db_user.task_groups) == 0:
                    return 'no groups'
                task_group = session.query(CustomTaskGroup).filter(
                    CustomTaskGroup.id == group_id).first()
                if task_group is None:
                    return 'no group'
                child_groups = session.query(CustomTaskGroup).filter(
                    CustomTaskGroup.parent_group_id == group_id).all()
                for child in child_groups:
                    self.del_user_group(child.id, user_id)
                group_tasks = task_group.tasks
                for task in group_tasks:
                    if task.category != 'finished':
                        db_user.statistics[0].amount_of_tasks -= 1
                session.delete(task_group)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return 'Group deleted'
