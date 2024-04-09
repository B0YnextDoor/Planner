from core.security import decode_token
from repositories.daily_routine.pro_repository import ProCodeRepository


class ProService:
    def __init__(self, pro_repository: ProCodeRepository) -> None:
        self.pro_repository = pro_repository

    def get_all(self):
        return self.pro_repository.get_all()

    def buy_user_pro(self, token: str, pro_code: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.pro_repository.buy_user_pro(user.get('user'), pro_code)
