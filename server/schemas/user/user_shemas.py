from pydantic import BaseModel


class UserBase(BaseModel):
    email: str

    class Config:
        from_attributes = True


class UserProfile(UserBase):
    name: str
    access_token: str


class UserCreate(UserProfile):
    password: str


class UserInfo(UserCreate):
    id: int
    is_pro: bool
    organisation_role: str
