from contextlib import AbstractContextManager
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

    def get_user_groups(self, user_id: int):
        with self.session_factory() as session:
            return session.query(CustomTaskGroup).filter(CustomTaskGroup.user_id == user_id).all()

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
                if parent_group is not None:
                    parent_group.child_group_id[new_group.id] = ""
                session.commit()
                session.refresh(new_group)
            except IntegrityError:
                IntegrityError()
            return new_group

    def upd_user_group(self, group_name: str, parent_group_id: int, child_group_id: list[int],
                       group_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                parent_group = session.query(CustomTaskGroup).filter(
                    CustomTaskGroup.id == parent_group_id, CustomTaskGroup.user_id == user_id).first()
                if parent_group_id != -1 and parent_group is None:
                    return 'no parent'
                group = session.query(CustomTaskGroup).filter(CustomTaskGroup.id == group_id,
                                                              CustomTaskGroup.user_id == user_id).first()
                if group is None:
                    return 'no group'
                group.group_name = group_name
                group.parent_group_id = parent_group_id
                group.child_group_id = dict()
                for id in child_group_id:
                    group.child_group_id[id] = ""
                    child_group = session.query(CustomTaskGroup).filter(
                        CustomTaskGroup.id == id, CustomTaskGroup.user_id == user_id).first()
                    if child_group is not None:
                        child_group.parent_group_id = group.id
                    else:
                        return 'no child'
                if parent_group is not None:
                    parent_group.child_group_id[group.id] = ""
                session.commit()
                session.refresh(group)
            except IntegrityError:
                IntegrityError()
            return group

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
                    CustomTaskGroup.id == group_id)
                if task_group is None:
                    return 'no group'
                session.delete(task_group)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return None
