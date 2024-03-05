from contextlib import AbstractContextManager
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.organisation.organisation_model import Organisation
from models.statistics.statistics_model import OrganisationStatistics, UserStatistics
from models.user.user_model import User


class StatisticsRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all_user_stat(self):
        with self.session_factory() as session:
            return session.query(UserStatistics).all()

    def get_all_organisation_stat(self):
        with self.session_factory() as session:
            return session.query(OrganisationStatistics).all()

    def get_user_stat(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            elif len(db_user.statistics) == 0:
                return 'no stat'
            return db_user.statistics[0]

    def upd_user_stat(self, amount_of_tasks: int, finished_tasks: int, overdued_tasks: int, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif len(db_user.statistics) == 0:
                    return 'no stat'
                db_user.statistics[0].amount_of_tasks = amount_of_tasks
                db_user.statistics[0].finished_tasks = finished_tasks
                db_user.statistics[0].overdued_tasks = overdued_tasks
                session.commit()
                session.refresh(db_user.statistics[0])
            except IntegrityError:
                raise IntegrityError()
            return db_user.statistics[0]

    def get_organisation_stat(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            organisation = session.query(Organisation).filter(
                Organisation.id == db_user.organisation_id).first()
            if organisation is None:
                return 'no org'
            elif len(organisation.statistics) == 0:
                return 'no stat'
            return organisation.statistics[0]

    def upd_organisation_stat(self, amount_of_tasks: int, finished_tasks: int, user_id: int):
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
                elif len(organisation.statistics) == 0:
                    return 'no stat'
                organisation.statistics[0].amount_of_tasks = amount_of_tasks
                organisation.statistics[0].finished_tasks = finished_tasks
                session.commit()
                session.refresh(organisation.statistics[0])
            except IntegrityError:
                raise IntegrityError()
            return organisation.statistics[0]
