from core.security import decode_token
from repositories.group.group_repository import CustomTaskGroupRepository


class CustomTaskGroupService:
    def __init__(self, group_repository: CustomTaskGroupRepository) -> None:
        self.group_repository = group_repository

    def get_all(self):
        return self.group_repository.get_all()

    def get_user_groups(self, token: str, parent_id: int):
        user = decode_token(token)
        if user is None:
            return None
        return self.group_repository.get_user_groups(user.get('user'), parent_id)

    def create_user_group(self, group_name: str, parent_group_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.group_repository.create_user_group(group_name, parent_group_id, user.get('user'))

    def upd_user_group(self, group_name: str | None, parent_group_id: int, group_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.group_repository.upd_user_group(group_name, parent_group_id, group_id, user.get('user'))

    def del_user_group(self, group_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.group_repository.del_user_group(group_id, user.get('user'))
