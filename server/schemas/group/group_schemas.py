from pydantic import BaseModel


class ParentGroup(BaseModel):
    parent: int


class GroupInfo(ParentGroup):
    group_name: str | None


class GroupUpd(GroupInfo):
    group_id: int


class GroupDel(BaseModel):
    group_id: int
