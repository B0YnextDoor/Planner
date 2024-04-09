from fastapi import APIRouter, Cookie, Depends
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.daily_routine.routine_schemas import RoutineTemplateId, RoutineTemplate, UpdateTemplate, UpdateTemplateHabits
from services.daily_routine.routine_templates_service import RoutineTemplateService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no-template':
        raise ValidationError('template not found')
    return response


template_router = APIRouter(
    prefix='/routine/templates', tags=['daily-routine template'])


@template_router.post('/all')
@inject
async def get_all_templates(access_token: str | None = Cookie(default=None),
                            template_service: RoutineTemplateService = Depends(Provide[Container.template_service])):
    return ReturnResponse(template_service.get_user_templates(access_token))


@template_router.post('/add')
@inject
async def create_template(routine: RoutineTemplate,
                          access_token: str | None = Cookie(default=None),
                          template_service: RoutineTemplateService = Depends(Provide[Container.template_service])):
    return ReturnResponse(template_service.create_template(routine.time, routine.habits, access_token))


@template_router.post('/upd')
@inject
async def update_template(template: UpdateTemplate,
                          access_token: str | None = Cookie(default=None),
                          template_service: RoutineTemplateService = Depends(Provide[Container.template_service])):
    return ReturnResponse(template_service.update_template(template.name, template.template_id, access_token))


@template_router.post('/upd-habits')
@inject
async def update_template_habits(template: UpdateTemplateHabits,
                                 access_token: str | None = Cookie(
                                     default=None),
                                 template_service: RoutineTemplateService = Depends(Provide[Container.template_service])):
    return ReturnResponse(template_service.update_template_habits(template.template_id, template.time, template.habits, access_token))


@template_router.post('/del')
@inject
async def delete_template(template: RoutineTemplateId,
                          access_token: str | None = Cookie(default=None),
                          template_service: RoutineTemplateService = Depends(Provide[Container.template_service])):
    return ReturnResponse(template_service.delete_template(template.template_id, access_token))


@template_router.post('/load')
@inject
async def load_template(template: RoutineTemplateId,
                        access_token: str | None = Cookie(default=None),
                        template_service: RoutineTemplateService = Depends(Provide[Container.template_service])):
    return ReturnResponse(template_service.load_template(template.template_id, access_token))
