from pydantic import BaseModel


class JoinOrganisation(BaseModel):
    invite_code: str  # org head refresh token


class InviteUser(JoinOrganisation):
    email: str


class DeleteMember(BaseModel):
    member_id: int


class OrganisationSettings(BaseModel):
    name: str
    description: str
