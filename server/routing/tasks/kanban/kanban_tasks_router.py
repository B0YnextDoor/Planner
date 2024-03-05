from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.tasks.kanban.kanban_task_schemas import KanbanUpd
from schemas.tasks.task_schemas import DeleteTask, TaskInfo
from schemas.token.token_schemas import TokenBase
from services.tasks.kanban.kanban_task_service import KanbanTaskService


def ReturnResponse(response):
    if response is None:
        return NotFoundError('user not found')
    elif response == 'no task':
        return ValidationError('task not found')
    return response


kanban_router = APIRouter(prefix='/tasks/kanban', tags=['kanban-tasks'])


@kanban_router.get("/all")
@inject
async def get_all(kanban_task_service: KanbanTaskService = Depends(Provide[Container.kanban_tasks_service])):
    return kanban_task_service.get_all_kanban()


@kanban_router.post("/user")
@inject
async def get_user_todo(token: TokenBase,
                        kanban_task_service: KanbanTaskService = Depends(Provide[Container.kanban_tasks_service])):
    return ReturnResponse(kanban_task_service.get_user_kanban(token.access_token))


@kanban_router.post("/add")
@inject
async def create_todo(task: TaskInfo,
                      kanban_task_service: KanbanTaskService = Depends(Provide[Container.kanban_tasks_service])):
    return ReturnResponse(kanban_task_service.create_kanban(task.category, task.description,
                                                            task.priority, task.access_token))


@kanban_router.post("/upd")
@inject
async def upd_todo(task: KanbanUpd,
                   kanban_task_service: KanbanTaskService = Depends(Provide[Container.kanban_tasks_service])):
    return ReturnResponse(kanban_task_service.upd_kanban(task.category, task.description, task.priority, task.task_id, task.access_token))


@kanban_router.post("/del")
@inject
async def del_todo(task: DeleteTask,
                   kanban_task_service: KanbanTaskService = Depends(Provide[Container.kanban_tasks_service])):
    return ReturnResponse(kanban_task_service.del_kanban(task.task_id, task.access_token))
