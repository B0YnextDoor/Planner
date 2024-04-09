from fastapi import APIRouter, Cookie, Depends
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import ValidationError
from schemas.daily_routine.routine_schemas import BuyUserPro
from services.daily_routine.pro_service import ProService


pro_router = APIRouter(prefix='/user-pro', tags=['user pro'])


@pro_router.get("/all")
@inject
async def get_all(pro_service: ProService = Depends(Provide[Container.pro_service])):
    return pro_service.get_all()


@pro_router.post("/buy-pro")
@inject
async def buy_user_pro(code: BuyUserPro,
                       access_token: str | None = Cookie(default=None),
                       pro_service: ProService = Depends(Provide[Container.pro_service])):
    response = pro_service.buy_user_pro(access_token, code.pro_code)
    if response == 'wrong code':
        raise ValidationError('Wrong code')
    return response
