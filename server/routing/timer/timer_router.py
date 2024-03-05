from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.timer.timer_schemas import CurrentSession, TimerSettings, UpdateSession
from schemas.token.token_schemas import TokenBase
from services.timer.timer_service import TimerService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == "no-sess":
        raise ValidationError('session not found')
    return response


timer_router = APIRouter(prefix='/timer', tags=['timer'])


@timer_router.get("/get_sessions")
@inject
async def get_sessions(timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return timer_service.get_sessions()


@timer_router.get("/get_rounds")
@inject
async def get_rounds(timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return timer_service.get_rounds()


@timer_router.post("/settings")
@inject
async def get_settings(tokens: TokenBase, timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.get_timer_settings(tokens.access_token))


@timer_router.post("/upd_settings")
@inject
async def upd_settings(new_settings: TimerSettings, timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.upd_timer_settings(
        new_settings.work_interval, new_settings.rest_interval, new_settings.laps_ammount, new_settings.access_token))


@timer_router.post("/new-session")
@inject
async def create_new_session(token: TokenBase, timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.create_new_session(token.access_token))


@timer_router.post("/upd-session")
@inject
async def update_session(session: UpdateSession, timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.update_session(
        session.access_token, session.is_completed))


@timer_router.post("/upd-round")
@inject
async def update_round(round: CurrentSession, timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.update_round(
        round.access_token, round.current_lap, round.total_seconds))


@timer_router.post("/current")
@inject
async def get_current_session(token: TokenBase, timer_service:
                              TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.get_current_round(token.access_token))
