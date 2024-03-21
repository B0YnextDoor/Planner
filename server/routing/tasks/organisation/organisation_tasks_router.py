from fastapi import APIRouter, Cookie, Depends
from core.server_exceptions import NotFoundError, ValidationError
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from schemas.tasks.organisation.organisation_task_schemas import OrganisationTaskInfo, OrganisationTaskUpd
from schemas.tasks.task_schemas import DeleteTask
from services.tasks.organisation.organisation_tasks_service import OrganisationTaskService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no task':
        raise ValidationError('task not found')
    elif response == 'no org':
        raise ValidationError('organisation not found')
    elif response == 'not head':
        raise ValidationError('not head of organosation')
    return response


organisation_tasks_router = APIRouter(
    prefix='/tasks/organisation', tags=['organisation-tasks'])


@organisation_tasks_router.get("/all")
@inject
async def get_all(organisation_task_service: OrganisationTaskService = Depends(Provide[Container.organisation_tasks_service])):
    return organisation_task_service.get_all()


@organisation_tasks_router.post("/organisation-tasks")
@inject
async def get_organisation_tasks(access_token: str | None = Cookie(default=None), organisation_task_service: OrganisationTaskService = Depends(Provide[Container.organisation_tasks_service])):
    return ReturnResponse(organisation_task_service.get_organisation_tasks(access_token))


@organisation_tasks_router.post("/add")
@inject
async def create_organisation_task(task: OrganisationTaskInfo,
                                   access_token: str | None = Cookie(
                                       default=None),
                                   organisation_task_service: OrganisationTaskService = Depends(Provide[Container.organisation_tasks_service])):
    return ReturnResponse(organisation_task_service.create_organisation_task(
        task.category, task.description, task.priority, task.executors, access_token))


@organisation_tasks_router.post("/upd")
@inject
async def update_organisation_task(task: OrganisationTaskUpd,
                                   access_token: str | None = Cookie(
                                       default=None),
                                   organisation_task_service: OrganisationTaskService = Depends(Provide[Container.organisation_tasks_service])):
    return ReturnResponse(organisation_task_service.upd_organisation_task(
        task.category, task.description, task.priority, task.executors, task.task_id, access_token
    ))


@organisation_tasks_router.post("/del")
@inject
async def delete_organisation_task(task: DeleteTask,
                                   access_token: str | None = Cookie(
                                       default=None),
                                   organisation_task_service: OrganisationTaskService = Depends(Provide[Container.organisation_tasks_service])):
    return ReturnResponse(organisation_task_service.del_organisation_task(task.task_id, access_token))
