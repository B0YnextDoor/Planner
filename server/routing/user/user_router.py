from fastapi import APIRouter, Cookie, Depends
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from core.server_exceptions import DuplicatedError, NotFoundError, TokenError
from schemas.user.user_shemas import UserCreate
from services.user.user_service import UserService


user_router = APIRouter(prefix='/user', tags=['user'])


@user_router.get("/all")
@inject
async def get_all(user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.get_all()


@user_router.post("/id")
@inject
async def get_by_id(access_token: str | None = Cookie(default=None),
                    user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.get_by_id(access_token)


@user_router.delete("/del-all")
@inject
async def del_all(user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.del_all()


@user_router.delete("/del-by-id")
@inject
async def del_by_id(access_token: int,
                    user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.del_by_id(access_token)


@user_router.post("/refresh")
@inject
async def refresh_current(refresh_token: str | None = Cookie(default=None),
                          user_service: UserService = Depends(Provide[Container.user_service])):
    acc_token, ref_token = user_service.refresh(refresh_token)
    if acc_token is None:
        raise TokenError('no-refresh')
    return user_service.set_cookie(JSONResponse, acc_token, ref_token, True)


@user_router.post("/upd-profile")
@inject
async def upd_user(user: UserCreate,
                   access_token: str | None = Cookie(default=None),
                   user_service: UserService = Depends(Provide[Container.user_service])):
    access_token, refresh_token = user_service.upd_user_profile(
        user.name, user.email, user.password, access_token)
    if access_token is None:
        raise NotFoundError('user not found')
    elif access_token is 'exists':
        raise DuplicatedError("User exists")
    return user_service.set_cookie(
        JSONResponse, access_token, refresh_token, "Profile updated")


@user_router.post("/profile")
@inject
async def get_settings(access_token: str | None = Cookie(default=None),
                       user_service: UserService = Depends(Provide[Container.user_service])):
    response = user_service.get_profile(access_token)
    if response is None:
        raise NotFoundError('user not found')
    return response


@user_router.post("/achievements")
@inject
async def get_achievements(access_token: str | None = Cookie(default=None),
                           user_service: UserService = Depends(Provide[Container.user_service])):
    response = user_service.get_achievements(access_token)
    return response if response is not None else []
