from pydantic import BaseModel


class GroupInfo(BaseModel):
    group_name: str
    parent_group_id: int


class GroupUpd(GroupInfo):
    child_group_id: list[int]
    group_id: int


class GroupDel(BaseModel):
    group_id: int
