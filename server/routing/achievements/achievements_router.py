from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from container.container import Container
from schemas.achievement.achievement_schemas import Achievement
from services.achievements.achievements_service import AchievementsService


achievements_router = APIRouter(prefix='/achievement', tags=['achievements'])


@achievements_router.get('/all')
@inject
async def get_all_achievements(achievements_service: AchievementsService
                               = Depends(Provide[Container.achievements_service])):
    return achievements_service.get_all()


@achievements_router.post('/add')
@inject
async def add_to_user(data: Achievement,
                      achievements_service: AchievementsService = Depends(Provide[Container.achievements_service])):
    return achievements_service.add_achievement(data.description, data.title)
