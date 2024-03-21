from fastapi import APIRouter, Cookie, Depends
from core.server_exceptions import NotFoundError, ValidationError
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from schemas.tasks.custom.custom_task_schemas import CustomTaskDel, CustomTaskInfo, CustomTaskUpd
from services.tasks.custom.custom_task_service import CustomTaskService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no groups':
        raise ValidationError('user have no task groups')
    elif response == 'no group':
        raise ValidationError('group not found')
    elif response == 'no task':
        raise ValidationError('task not found')
    return response


custom_tasks_router = APIRouter(
    prefix='/tasks/groups/custom', tags=['custom-tasks'])


@custom_tasks_router.get("/all")
@inject
async def get_all(custom_task_service: CustomTaskService = Depends(Provide[Container.custom_tasks_service])):
    return custom_task_service.get_all()


@custom_tasks_router.post("/user")
@inject
async def get_user_tasks(access_token: str | None = Cookie(default=None),
                         custom_task_service: CustomTaskService = Depends(Provide[Container.custom_tasks_service])):
    return ReturnResponse(custom_task_service.get_user_custom(access_token))


@custom_tasks_router.post("/add")
@inject
async def create_custom_task(task: CustomTaskInfo,
                             access_token: str | None = Cookie(default=None),
                             custom_task_service: CustomTaskService = Depends(Provide[Container.custom_tasks_service])):
    return ReturnResponse(custom_task_service.create_custom_task(task.description, task.priority, task.group_id,
                                                                 access_token))


@custom_tasks_router.post("/upd")
@inject
async def update_custom_task(task: CustomTaskUpd,
                             access_token: str | None = Cookie(default=None),
                             custom_task_service: CustomTaskService = Depends(Provide[Container.custom_tasks_service])):
    return ReturnResponse(custom_task_service.update_custom_task(task.category, task.description, task.priority,
                                                                 task.group_id, task.task_id, access_token))


@custom_tasks_router.post("/del")
@inject
async def delete_custom_task(task: CustomTaskDel,
                             access_token: str | None = Cookie(default=None),
                             custom_task_service: CustomTaskService = Depends(Provide[Container.custom_tasks_service])):
    return ReturnResponse(custom_task_service.delete_custom_task(task.group_id, task.task_id, access_token))
