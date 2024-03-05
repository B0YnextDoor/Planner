from schemas.token.token_schemas import TokenBase


class GroupInfo(TokenBase):
    group_name: str
    parent_group_id: int


class GroupUpd(GroupInfo):
    child_group_id: list[int]
    group_id: int


class GroupDel(TokenBase):
    group_id: int
