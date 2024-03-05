from pydantic import BaseModel


class AuthBase(BaseModel):
    email: str

    class Config:
        from_attributes = True


class SignIn(AuthBase):
    password: str


class SignUp(SignIn):
    name: str
