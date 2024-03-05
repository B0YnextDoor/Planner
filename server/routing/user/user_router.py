from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from core.server_exceptions import DuplicatedError, TokenError
from schemas.token.token_schemas import DoubleToken, TokenBase
from schemas.user.user_shemas import UserProfile
from services.user.user_service import UserService


user_router = APIRouter(prefix='/user', tags=['user'])


@user_router.get("/all")
@inject
async def get_all(user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.get_all()


@user_router.post("/id")
@inject
async def get_by_id(token: TokenBase, user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.get_by_id(token.access_token)


@user_router.delete("/del-all")
@inject
async def del_all(user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.del_all()


@user_router.delete("/del-by-id")
@inject
async def del_by_id(token: TokenBase, user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.del_by_id(token.access_token)


@user_router.post("/get-me")
@inject
async def get_current(tokens: DoubleToken, user_service: UserService = Depends(Provide[Container.user_service])):
    access_token, refresh_token = user_service.get_me(tokens)
    if access_token is None:
        raise TokenError('no-refresh')
    return user_service.set_cookie(JSONResponse, access_token, refresh_token)


@user_router.post("/upd_profile")
@inject
async def upd_user(user: UserProfile, user_service: UserService = Depends(Provide[Container.user_service])):
    access_token, refresh_token = user_service.upd_user_profile(
        user.name, user.email, user.access_token)
    if access_token is None:
        raise DuplicatedError("User exists")
    return user_service.set_cookie(
        JSONResponse, access_token, refresh_token)


@user_router.post("/profile")
@inject
async def get_settings(token: TokenBase, user_service: UserService = Depends(Provide[Container.user_service])):
    return user_service.get_profile(token.access_token)


@user_router.post("/achievements")
@inject
async def get_achievements(token: TokenBase, user_service: UserService = Depends(Provide[Container.user_service])):
    response = user_service.get_achievements(token.access_token)
    return response if response is not None else []
