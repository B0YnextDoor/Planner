from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.achievement.achievement_schemas import AchievementAdd
from services.achievements.achievements_service import AchievementsService


achievements_router = APIRouter(prefix='/achievement', tags=['achievements'])


@achievements_router.get('/all')
@inject
async def get_all_achievements(achievements_service: AchievementsService
                               = Depends(Provide[Container.achievements_service])):
    return achievements_service.get_all()


@achievements_router.post('/add-to-user')
@inject
async def add_to_user(data: AchievementAdd, achievements_service: AchievementsService
                      = Depends(Provide[Container.achievements_service])):
    response = achievements_service.add_to_user(
        data.access_token, data.rules_to_achive)
    if response is None:
        raise NotFoundError('user not found')
    if response == "no-achivement":
        raise ValidationError('achievement not found')
    return response
