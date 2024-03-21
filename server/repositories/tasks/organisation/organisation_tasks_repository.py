from contextlib import AbstractContextManager
from datetime import datetime, timedelta, timezone
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
                                 executors: str, user_id: int):
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
                org_task.executors = executors
                organisation.statistics[0].amount_of_tasks += 1
                session.add(org_task)
                session.commit()
                session.refresh(org_task)
            except IntegrityError:
                IntegrityError()
            return 'Task created'

    def upd_organisation_task(self, category: str, description: str | None, priority: str | None,
                              executors: str | None, task_id: int, user_id: int):
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
                if category == 'done' and org_task.category != 'done':
                    organisation.statistics[0].amount_of_tasks -= 1
                    organisation.statistics[0].finished_tasks += 1
                    org_task.time_spent = (datetime.now(timezone(
                        timedelta(hours=3))) - datetime.fromisoformat(org_task.time_created)).total_seconds() + 1
                elif org_task.category == 'done':
                    org_task.time_spent = 0
                    organisation.statistics[0].amount_of_tasks += 1
                    organisation.statistics[0].finished_tasks -= 1
                elif category == 'in process':
                    org_task.time_created = datetime.now(
                        timezone(timedelta(hours=3))).isoformat()
                org_task.category = category
                if description is not None:
                    org_task.description = description
                if priority is not None:
                    org_task.priority = priority
                if executors is not None:
                    org_task.executors = executors
                session.commit()
                session.refresh(org_task)
            except IntegrityError:
                IntegrityError()
            return 'Task updated'

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
                if org_task.category != 'done':
                    organisation.statistics[0].amount_of_tasks -= 1
                session.delete(org_task)
                session.commit()
            except IntegrityError:
                IntegrityError()
            return "Task deleted"
