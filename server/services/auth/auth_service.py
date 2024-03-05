from core.security import deleteCookie, hash_password, refresh_tokens, verify_user
from repositories.user.user_repository import UserRepository
from services.base.base_service import BaseService


class AuthService(BaseService):
    def __init__(self, auth_repository: UserRepository) -> None:
        self.auth_repository = auth_repository

    def sign_up(self, name: str, email: str, password: str):
        if self.auth_repository.get_by_email(email) is not None:
            return None, None
        return refresh_tokens(self.auth_repository.add_user(name, email,
                                                            hash_password(password)))

    def sign_in(self, email: str, password: str):
        db_user = self.auth_repository.get_by_email(email)
        if db_user is None:
            return None, 'wrong email'
        return verify_user(db_user.hashed_password, password, db_user)

    def sign_out(self, response):
        return deleteCookie(response)
