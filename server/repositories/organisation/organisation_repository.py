from contextlib import AbstractContextManager
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.notification.notification_model import Notification
from models.organisation.organisation_model import Organisation
from models.statistics.statistics_model import OrganisationStatistics
from models.tasks.organisation_task_model import OrganisationTask
from models.user.user_model import User


class OrganisationRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory

    def get_all(self):
        with self.session_factory() as session:
            return session.query(Organisation).all()

    def del_all(self) -> None:
        with self.session_factory() as session:
            session.query(Organisation).delete()
            session.commit()

    def del_by_id(self, user_id: int) -> None:
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            elif db_user.organisation_role != 'head':
                return 'not head'
            organisation = session.query(Organisation).filter(
                Organisation.id == db_user.organisation_id).first()
            if organisation is None:
                return 'no org'
            members = session.query(User).filter(
                User.organisation_id == organisation.id).all()
            for member in members:
                member.organisation_id = -1
                member.organisation_role = ""
                if (member.id != db_user.id):
                    session.add(Notification(
                        "Your organisation was dissolved by the head", member.id))
            session.delete(organisation)
            session.commit()
            return "Organisation deleted"

    def get_by_name(self, name: str):
        with self.session_factory() as session:
            return session.query(Organisation).filter(Organisation.name == name).first()

    def get_user_organisation(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            organisation = session.query(Organisation).filter(
                Organisation.id == db_user.organisation_id).first()
            return organisation if organisation is not None else 'no org'

    def get_organisation_members(self, user_id: int):
        with self.session_factory() as session:
            db_user = session.query(User).filter(User.id == user_id).first()
            if db_user is None:
                return None
            organisation = session.query(Organisation).filter(
                Organisation.id == db_user.organisation_id).first()
            if organisation is None:
                return 'no org'
            return session.query(User).filter(User.organisation_id == organisation.id).all()

    def create_organisation(self, user_id: int, name: str, description: str | None):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                db_org = self.get_by_name(name)
                if db_org is not None:
                    return 'already exists'
                organisation = Organisation(name, description)
                session.add(organisation)
                session.commit()
                db_user.organisation_id = organisation.id
                db_user.organisation_role = "head"
                if 10 not in db_user.achievements:
                    db_user.achievements[10] = ""
                session.add(OrganisationStatistics(organisation.id))
                session.commit()
                session.refresh(db_user)
                session.refresh(organisation)
            except IntegrityError:
                raise IntegrityError()
            return 'Organisation created'

    def upd_organisation_settings(self, user_id: int, name: str, description: str | None):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif db_user.organisation_role != "head":
                    return 'not head'
                organisation = session.query(Organisation).filter(
                    Organisation.id == db_user.organisation_id).first()
                if organisation is None:
                    return 'no org'
                db_org = self.get_by_name(name)
                if db_org is not None and db_org.id != organisation.id:
                    return 'already exists'
                organisation.name = name
                if description is not None:
                    organisation.description = description
                session.commit()
                session.refresh(organisation)
            except IntegrityError:
                raise IntegrityError()
            return 'Organisation updated'

    def invite_to_organisation(self, head_id: int, user_email: str, create_invitation):
        with self.session_factory() as session:
            try:
                org_head = session.query(User).filter(
                    User.id == head_id).first()
                if org_head is None:
                    return None
                elif org_head.organisation_role != "head":
                    return 'not head'
                organisation = session.query(Organisation).filter(
                    Organisation.id == org_head.organisation_id).first()
                if organisation is None:
                    return 'no org'
                new_memb = session.query(User).filter(
                    User.email == user_email).first()
                if new_memb is None:
                    return 'no member'
                elif new_memb.organisation_role == "head" and \
                        session.query(Organisation).filter(Organisation.id == new_memb.organisation_id).first() is not None:
                    return 'head of org'
                notification = Notification(f"You was invited to organisation: {organisation.name}.", new_memb.id,
                                            create_invitation(org_head.organisation_id))
                session.add(notification)
                session.commit()
                session.refresh(notification)
            except IntegrityError:
                raise IntegrityError()
            return 'User invited'

    def join_organisation(self, user_id: int, invite_code: str, decode_token):
        with self.session_factory() as session:
            try:
                recrut_user = session.query(User).filter(
                    User.id == user_id).first()
                if recrut_user is None:
                    return None
                elif recrut_user.organisation_role == "head" and \
                        session.query(Organisation).filter(Organisation.id == recrut_user.organisation_id).first() is not None:
                    return 'head of org'
                info = decode_token(invite_code)
                if info is None:
                    return 'code expired'
                organisation = session.query(Organisation).filter(
                    Organisation.id == info.get('org')).first()
                if organisation is None:
                    return 'no org'
                recrut_user.organisation_id = organisation.id
                recrut_user.organisation_role = "memb"
                if 9 not in recrut_user.achievements:
                    recrut_user.achievements[9] = ""
                session.commit()
                session.refresh(recrut_user)
            except IntegrityError:
                raise IntegrityError()
            return "Successfully joined"

    def leave_organisation(self, user_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif db_user.organisation_id < 0:
                    return 'no org'
                if db_user.organisation_role == "head":
                    new_head = session.query(User).filter(
                        User.organisation_id == db_user.organisation_id, User.organisation_role == "memb").first()
                    if new_head is None:
                        self.del_by_id(user_id)
                    else:
                        new_head.organisation_role = "head"
                        notification = Notification(
                            "You was promoted to the head of organisation", new_head.id)
                        session.add(notification)
                        session.commit()
                        session.refresh(new_head)
                else:
                    org_head = session.query(User).filter(
                        User.organisation_id == db_user.organisation_id, User.organisation_role == 'head').first()
                    if org_head is None:
                        return 'no org'
                    notification = Notification(
                        f'User {db_user.email} leaved your organisation', org_head.id)
                    session.add(notification)
                    session.commit()
                    session.refresh(org_head)
                org_tasks = session.query(OrganisationTask).filter(
                    OrganisationTask.organisation_id == db_user.organisation_id).all()
                if org_tasks is not None:
                    for task in org_tasks:
                        executors = task.executors.split(',')
                        if db_user.email in executors:
                            executors.remove(db_user.email)
                            if len(executors) > 0:
                                task.executors = ",".join(executors)
                                session.commit()
                                session.refresh(task)
                            else:
                                if task.category != 'done':
                                    organisation = session.query(Organisation).filter(
                                        Organisation.id == task.organisation_id).first()
                                    if organisation is not None:
                                        organisation.statistics[0].amount_of_tasks -= 1
                                session.delete(task)
                                session.commit()
                db_user.organisation_id = -1
                db_user.organisation_role = ""
                session.commit()
                session.refresh(db_user)
            except IntegrityError:
                raise IntegrityError()
            return 'Organisation leaved'

    def delete_organisation_member(self, user_id: int, member_id: int):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(
                    User.id == user_id).first()
                if db_user is None:
                    return None
                elif db_user.organisation_id < 0:
                    return 'no org'
                elif db_user.organisation_role != "head":
                    return 'not head'
                del_member = session.query(User).filter(
                    User.id == member_id, User.organisation_id == db_user.organisation_id).first()
                if del_member is None:
                    return 'no member'
                elif del_member == db_user:
                    return self.leave_organisation(user_id)
                org_tasks = session.query(OrganisationTask).filter(
                    OrganisationTask.organisation_id == db_user.organisation_id).all()
                if org_tasks is not None:
                    for task in org_tasks:
                        executors = task.executors.split(',')
                        if del_member.email in executors:
                            executors.remove(del_member.email)
                            if len(executors) > 0:
                                task.executors = ",".join(executors)
                                session.commit()
                                session.refresh(task)
                            else:
                                if task.category != 'done':
                                    organisation = session.query(Organisation).filter(
                                        Organisation.id == task.organisation_id).first()
                                    if organisation is not None:
                                        organisation.statistics[0].amount_of_tasks -= 1
                                session.delete(task)
                                session.commit()
                del_member.organisation_id = -1
                del_member.organisation_role = ""
                notification = Notification(
                    "You was droped out from organisation", del_member.id)
                session.add(notification)
                session.commit()
                session.refresh(del_member)
            except IntegrityError:
                raise IntegrityError()
            return "Member deleted"
