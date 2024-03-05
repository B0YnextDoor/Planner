from schemas.token.token_schemas import TokenBase


class JoinOrganisation(TokenBase):
    invite_code: str  # org head refresh token


class InviteUser(JoinOrganisation):
    email: str


class DeleteMember(TokenBase):
    member_id: int


class OrganisationSettings(TokenBase):
    name: str
    description: str
