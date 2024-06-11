from typing import List
from core.security import check_refresh_token, decode_token, get_current_user, hash_password, refresh_tokens
from models.user.user_model import User
from repositories.user.user_repository import UserRepository
from schemas.token.token_schemas import Tokens
from services.base.base_service import BaseService


class UserService(BaseService):
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository: UserRepository = user_repository

    def del_all(self) -> None:
        return self.user_repository.del_all()

    def del_by_id(self, token: str) -> None:
        return self.user_repository.del_by_id(int(token))

    def get_all(self) -> List[User]:
        return self.user_repository.get_all()

    def get_by_id(self, token: str):
        user = decode_token(token)
        return self.user_repository.get_by_id(user.get('user')) if user is not None else None

    def refresh(self, ref_token: str):
        access_token, refresh_token = check_refresh_token(
            ref_token, self.user_repository.get_by_id)
        if access_token is None:
            return None, None
        return access_token, refresh_token

    def get_me(self, tokens: Tokens):
        access_token, refresh_token = get_current_user(
            tokens, self.user_repository.get_by_id)
        if access_token is None:
            return None, None
        return access_token, refresh_token

    def upd_user_profile(self, new_name: str, new_email: str, new_password: str | None, token: str):
        db_user = self.get_by_id(token)
        if db_user is None:
            return None, None
        if self.user_repository.get_by_email(new_email) is not None and db_user.email != new_email:
            return 'exists', None
        return refresh_tokens(self.user_repository.upd_user_profile(
            new_name, new_email, hash_password(new_password), db_user.id))

    def get_profile(self, token: str):
        db_user = self.get_by_id(token)
        return {'email': db_user.email, 'name': db_user.name, 'is_pro': db_user.is_pro,
                'organisation_role': db_user.organisation_role} if db_user is not None else None

    def get_achievements(self, token: str):
        user = decode_token(token)
        return self.user_repository.get_achievements(user.get('user')) if user is not None else None
