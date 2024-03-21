from core.security import decode_token, create_invitation
from repositories.organisation.organisation_repository import OrganisationRepository


class OrganisationService:
    def __init__(self, organisation_repository: OrganisationRepository) -> None:
        self.organisation_repository = organisation_repository

    def get_all(self):
        return self.organisation_repository.get_all()

    def del_all(self):
        return self.organisation_repository.del_all()

    def del_by_id(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.del_by_id(
            user.get('user'))

    def get_user_organisation(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.get_user_organisation(
            user.get('user'))

    def get_organisation_members(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.organisation_repository.get_organisation_members(
            user.get('user'))
        if response is None or type(response) == str:
            return response
        members = []
        for memb in response:
            members.append(
                {'id': memb.id, 'name': memb.name, 'email': memb.email, 'role': memb.organisation_role})
        return members

    def create_organisation(self, token: str, name: str, description: str | None):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.create_organisation(
            user.get('user'), name, description)

    def upd_organisation_settings(self, token: str, name: str, description: str | None):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.upd_organisation_settings(
            user.get('user'), name, description)

    def invite_to_organisation(self, token: str, email: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.invite_to_organisation(user.get('user'),
                                                                   email, create_invitation)

    def join_organisation(self, token: str, invite_code: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.join_organisation(
            user.get('user'), invite_code, decode_token)

    def leave_organisation(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.leave_organisation(
            user.get('user'))

    def delete_organisation_member(self, token: str, member_id: int):
        user = decode_token(token)
        if user is None:
            return None
        return self.organisation_repository.delete_organisation_member(
            user.get('user'), member_id)
