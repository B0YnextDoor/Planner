from fastapi import APIRouter, Cookie, Depends
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.timer.timer_schemas import CurrentSession, RoundInfo, TimerSettings, UpdateSession
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
async def get_settings(access_token: str | None = Cookie(default=None),
                       timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.get_timer_settings(access_token))


@timer_router.post("/upd_settings")
@inject
async def upd_settings(new_settings: TimerSettings,
                       access_token: str | None = Cookie(default=None),
                       timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.upd_timer_settings(
        new_settings.work_interval, new_settings.rest_interval, new_settings.laps_ammount, access_token))


@timer_router.post("/new-session")
@inject
async def create_new_session(access_token: str | None = Cookie(default=None),
                             timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.create_new_session(access_token))


@timer_router.post("/upd-session")
@inject
async def update_session(session: UpdateSession,
                         access_token: str | None = Cookie(default=None),
                         timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.update_session(access_token, session.is_completed))


@timer_router.post("/upd-round")
@inject
async def update_round(round: CurrentSession,
                       access_token: str | None = Cookie(default=None),
                       timer_service: TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.update_round(
        access_token, round.current_lap, round.total_work_seconds, round.total_rest_seconds))


@timer_router.post("/current")
@inject
async def get_current_session(access_token: str | None = Cookie(default=None),
                              timer_service:
                              TimerService = Depends(Provide[Container.timer_service])):
    return ReturnResponse(timer_service.get_current_round(access_token))
