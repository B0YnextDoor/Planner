from core.security import setCookie


class BaseService:
    def __init__(self) -> None:
        pass

    def set_cookie(self, Response, access_token, refresh_token, content=None):
        return setCookie(Response, access_token, refresh_token, content)
