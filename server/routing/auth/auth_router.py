from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import AuthError, DuplicatedError
from schemas.auth.auth_schemas import SignIn, SignUp
from services.auth.auth_service import AuthService

auth_router = APIRouter(prefix='/auth', tags=['auth'])


@auth_router.post("/sign-up")
@inject
async def sign_up(user: SignUp, auth_service: AuthService = Depends(Provide[Container.auth_service])):
    access_token, refresh_token = auth_service.sign_up(
        user.name, user.email, user.password)
    if access_token is None:
        raise DuplicatedError("User exists")
    return auth_service.set_cookie(JSONResponse, access_token, refresh_token)


@auth_router.post("/sign-in")
@inject
async def sign_in(user: SignIn, auth_service: AuthService = Depends(Provide[Container.auth_service])):
    access_token, refresh_token = auth_service.sign_in(
        user.email, user.password)
    if access_token is None:
        raise AuthError(refresh_token)
    return auth_service.set_cookie(JSONResponse, access_token, refresh_token)


@auth_router.post("/sign-out")
@inject
async def sign_out(auth_service: AuthService = Depends(Provide[Container.auth_service])):
    return auth_service.sign_out(JSONResponse(status_code=200, content='log out'))
