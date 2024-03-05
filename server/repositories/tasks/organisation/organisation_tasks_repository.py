from contextlib import AbstractContextManager
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.organisation.organisation_model import Organisation
from models.tasks.organisation_task_model import OrganisationTask
from models.user.user_model import User


class OrganisationTaskRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all(self):
        with self.session_factory() as session:
            return session.query(OrganisationTask).all()

    def get_organisation_tasks(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            organisation = session.query(Organisation).filter(
                Organisation.id == db_user.organisation_id).first()
            if organisation is None:
                return 'no org'
            return organisation.tasks

    def create_organisation_task(self, category: str, description: str, priority: str,
                                 executors: list[int], user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif db_user.organisation_role != 'head':
                    return 'not head'
                organisation = session.query(Organisation).filter(
                    Organisation.id == db_user.organisation_id).first()
                if organisation is None:
                    return 'no org'
                org_task = OrganisationTask(
                    category, description, priority, organisation.id)
                for user in executors:
                    org_task.executors[user] = ""
                organisation.statistics[0].amount_of_tasks += 1
                session.add(org_task)
                session.commit()
                session.refresh(org_task)
            except IntegrityError:
                IntegrityError()
            return org_task

    def upd_organisation_task(self, category: str, description: str, priority: str, executors: list[int],
                              task_id: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                organisation = session.query(Organisation).filter(
                    Organisation.id == db_user.organisation_id).first()
                if organisation is None:
                    return 'no org'
                org_task = session.query(OrganisationTask).filter(
                    OrganisationTask.organisation_id == organisation.id, OrganisationTask.id == task_id).first()
                if org_task is None:
                    return 'no task'
                if category == 'DONE':
                    organisation.statistics[0].amount_of_tasks -= 1
                    organisation.statistics[0].finished_tasks += 1
                    org_task.time_spent = (datetime.now(
                    ) - datetime.fromisoformat(org_task.time_created)).total_seconds()
                org_task.category = category
                org_task.description = description
                org_task.priority = priority
                org_task.executors = {}
                for user in executors:
                    org_task.executors[user] = ""
                session.commit()
                session.refresh(org_task)
            except IntegrityError:
                IntegrityError()
            return org_task

    def del_organisation_task(self, user_id: int, task_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                organisation = session.query(Organisation).filter(
                    Organisation.id == db_user.organisation_id).first()
                if organisation is None:
                    return 'no org'
                org_task = session.query(OrganisationTask).filter(
                    OrganisationTask.organisation_id == organisation.id, OrganisationTask.id == task_id).first()
                if org_task is None:
                    return 'no task'
                if org_task.category == 'DONE':
                    organisation.statistics[0].finished_tasks -= 1
                else:
                    organisation.statistics[0].amount_of_tasks -= 1
                session.delete(org_task)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return "task deleted"
