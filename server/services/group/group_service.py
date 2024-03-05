from core.security import decode_token
from repositories.group.group_repository import CustomTaskGroupRepository


class CustomTaskGroupService:
    def __init__(self, group_repository: CustomTaskGroupRepository) -> None:
        self.group_repository = group_repository

    def get_all(self):
        return self.group_repository.get_all()

    def get_user_groups(self, token: str):
        return self.group_repository.get_user_groups(decode_token(token).get('user'))

    def create_user_group(self, group_name: str, parent_group_id: int, token: str):
        return self.group_repository.create_user_group(group_name, parent_group_id, decode_token(token).get('user'))

    def upd_user_group(self, group_name: str, parent_group_id: int, child_group_id: list[int],
                       group_id: int, token: str):
        return self.group_repository.upd_user_group(group_name, parent_group_id, child_group_id, group_id,
                                                    decode_token(token).get('user'))

    def del_user_group(self, group_id: int, token: str):
        return self.group_repository.del_user_group(group_id, decode_token(token).get('user'))
