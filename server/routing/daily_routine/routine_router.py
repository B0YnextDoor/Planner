from fastapi import APIRouter, Cookie, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.daily_routine.routine_schemas import BuyUserPro, HabitBase, HabitUpdate, UpdateOrder
from services.daily_routine.routine_service import RoutineService


def ReturnResponse(response, text: str):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no-routine':
        raise ValidationError(f'{text} not found')
    elif response == 'wrong code':
        raise ValidationError(text)
    elif response == 'no time':
        raise ValidationError('can\'t add a habit')
    return response


routine_router = APIRouter(prefix='/routine', tags=['daily-routine'])


@routine_router.get("/all")
@inject
async def get_all(routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return routine_service.get_all()


@routine_router.get("/all-habits")
@inject
async def get_all_habits(routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return routine_service.get_habits_all()


@routine_router.post("/buy-pro")
@inject
async def buy_user_pro(code: BuyUserPro,
                       access_token: str | None = Cookie(default=None),
                       routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return ReturnResponse(routine_service.buy_user_pro(access_token, code.pro_code), 'wrong code')


@routine_router.post("/user")
@inject
async def get_user_routine(access_token: str | None = Cookie(default=None),
                           routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return ReturnResponse(routine_service.get_user_routine(access_token), 'routine')


@routine_router.post("/user-habits")
@inject
async def get_user_habits(access_token: str | None = Cookie(default=None),
                          routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return ReturnResponse(routine_service.get_user_habits(access_token), 'habits')


@routine_router.post("/create-user-habit")
@inject
async def create_user_habit(habit: HabitUpdate,
                            access_token: str | None = Cookie(default=None),
                            routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return ReturnResponse(routine_service.create_user_habit(access_token, habit.name, habit.duration, habit.color), 'habit')


@routine_router.post('/upd_habits-order')
@inject
async def create_user_habit(data: UpdateOrder,
                            access_token: str | None = Cookie(default=None),
                            routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return ReturnResponse(routine_service.upd_habits_order(access_token, data.order), 'habits')


@routine_router.post("/upd-user-habit")
@inject
async def upd_user_habit(habit: HabitUpdate,
                         access_token: str | None = Cookie(default=None),
                         routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return ReturnResponse(routine_service.upd_user_habit(
        access_token, habit.id, habit.name, habit.duration, habit.color), 'habit')


@routine_router.post("/del-user-habit")
@inject
async def del_user_habit(habit: HabitBase,
                         access_token: str | None = Cookie(default=None),
                         routine_service: RoutineService = Depends(Provide[Container.routine_service])):
    return ReturnResponse(routine_service.del_user_habit(
        access_token, habit.id), 'habit')
