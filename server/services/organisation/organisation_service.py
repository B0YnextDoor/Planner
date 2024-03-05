from core.security import decode_token
from repositories.organisation.organisation_repository import OrganisationRepository
from services.base.base_service import BaseService


class OrganisationService:
    def __init__(self, organisation_repository: OrganisationRepository) -> None:
        self.organisation_repository = organisation_repository

    def get_all(self):
        return self.organisation_repository.get_all()

    def del_all(self):
        return self.organisation_repository.del_all()

    def del_by_id(self, token: str):
        return self.organisation_repository.del_by_id(
            decode_token(token).get('user'))

    def get_user_organisation(self, token: str):
        return self.organisation_repository.get_user_organisation(
            decode_token(token).get('user'))

    def get_organisation_members(self, token: str):
        return self.organisation_repository.get_organisation_members(decode_token(token).get('user'))

    def create_organisation(self, token: str, name: str, description: str):
        return self.organisation_repository.create_organisation(
            decode_token(token).get('user'), name, description)

    def upd_organisation_settings(self, token: str, name: str, description: str):
        return self.organisation_repository.upd_organisation_settings(
            decode_token(token).get('user'), name, description)

    def invite_to_organisation(self, token: str, email: str, invite_code: str):
        return self.organisation_repository.invite_to_organisation(decode_token(token).get('user'), email, invite_code)

    def join_organisation(self, token: str, invite_code: str):
        return self.organisation_repository.join_organisation(
            decode_token(token).get('user'), invite_code, decode_token)

    def leave_organisation(self, token: str):
        return self.organisation_repository.leave_organisation(
            decode_token(token).get('user'))

    def delete_organisation_member(self, token: str, member_id: int):
        return self.organisation_repository.delete_organisation_member(
            decode_token(token).get('user'), member_id)
