from fastapi import APIRouter, Cookie, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.statistics.statistics_schemas import StatisticsInfo, UserStatistics
from services.statistics.statistics_service import StatisticsService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no stat':
        raise ValidationError('statistics not found')
    elif response == 'no org':
        raise ValidationError('organisation not found')
    return response


statistics_router = APIRouter(prefix='/statistics', tags=['statistics'])


@statistics_router.get('/user-all')
@inject
async def get_all_user_stat(statistics_service: StatisticsService = Depends(Provide[Container.statistics_service])):
    return statistics_service.get_all_user_stat()


@statistics_router.get('/organisation-all')
@inject
async def get_all_user_stat(statistics_service: StatisticsService = Depends(Provide[Container.statistics_service])):
    return statistics_service.get_all_organisation_stat()


@statistics_router.post('/user')
@inject
async def get_user_stat(access_token: str | None = Cookie(default=None), statistics_service: StatisticsService = Depends(Provide[Container.statistics_service])):
    return ReturnResponse(statistics_service.get_user_stat(access_token))


@statistics_router.post('/organisation')
@inject
async def get_organisation_stat(access_token: str | None = Cookie(default=None),
                                statistics_service: StatisticsService = Depends(Provide[Container.statistics_service])):
    return ReturnResponse(statistics_service.get_organisation_stat(access_token))


@statistics_router.post('/user-upd')
@inject
async def upd_user_stat(statistic: UserStatistics,
                        access_token: str | None = Cookie(default=None),
                        statistics_service: StatisticsService = Depends(Provide[Container.statistics_service])):
    return ReturnResponse(statistics_service.upd_user_stat(access_token, statistic.amount_of_tasks, statistic.finished_tasks, statistic.overdued_tasks))


@statistics_router.post('/organisation-upd')
@inject
async def upd_user_stat(statistic: StatisticsInfo,
                        access_token: str | None = Cookie(default=None),
                        statistics_service: StatisticsService = Depends(Provide[Container.statistics_service])):
    return ReturnResponse(statistics_service.upd_organisation_stat(access_token, statistic.amount_of_tasks, statistic.finished_tasks))
