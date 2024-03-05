from pydantic import BaseModel


class TokenBase(BaseModel):
    access_token: str


class DoubleToken(TokenBase):
    refresh_token: str
