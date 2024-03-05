from typing import List
from core.security import decode_token, get_current_user, refresh_tokens
from models.user.user_model import User
from repositories.user.user_repository import UserRepository
from schemas.token.token_schemas import DoubleToken, TokenBase
from schemas.user.user_shemas import UserProfile
from services.base.base_service import BaseService


class UserService(BaseService):
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository: UserRepository = user_repository

    def del_all(self) -> None:
        return self.user_repository.del_all()

    def del_by_id(self, token: str) -> None:
        return self.user_repository.del_by_id(decode_token(token).get('user'))

    def get_all(self) -> List[User]:
        return self.user_repository.get_all()

    def get_by_id(self, token: str):
        return self.user_repository.get_by_id(decode_token(token).get('user'))

    def get_me(self, tokens: DoubleToken):
        access_token, refresh_token = get_current_user(
            tokens, self.user_repository.get_by_id)
        if access_token is None:
            return None, None
        return access_token, refresh_token

    def upd_user_profile(self, new_name: str, new_email: str, token: str):
        db_user = self.user_repository.get_by_id(
            decode_token(token).get('user'))
        if self.user_repository.get_by_email(new_email) is not None and db_user.email != new_email:
            return None, None
        return refresh_tokens(self.user_repository.upd_user_profile(
            new_name, new_email, db_user.id))

    def get_profile(self, token: str):
        db_user = self.user_repository.get_by_id(
            decode_token(token).get('user'))
        return UserProfile(email=db_user.email, name=db_user.name, access_token="")

    def get_achievements(self, token: str):
        return self.user_repository.get_achievements(decode_token(token).get('user'))
