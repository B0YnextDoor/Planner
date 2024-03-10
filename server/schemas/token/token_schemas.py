from pydantic import BaseModel


class Tokens(BaseModel):
    access_token: str | None
    refresh_token: str | None
