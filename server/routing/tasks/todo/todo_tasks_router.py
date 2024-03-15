from fastapi import APIRouter, Cookie, Depends
from core.server_exceptions import NotFoundError, ValidationError
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from schemas.tasks.task_schemas import DeleteTask
from schemas.tasks.todo.todo_task_schemas import TodoInfo, TodoUpd
from services.tasks.todo.todo_task_service import TodoTaskService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no task':
        raise ValidationError('task not found')
    return response


todo_router = APIRouter(prefix='/tasks/todo', tags=['todo-tasks'])


@todo_router.get("/all")
@inject
async def get_all(todo_tasks_service: TodoTaskService = Depends(Provide[Container.todo_tasks_sevice])):
    return todo_tasks_service.get_all_todo()


@todo_router.post("/user")
@inject
async def get_user_todo(access_token: str | None = Cookie(default=None),
                        todo_task_service: TodoTaskService = Depends(Provide[Container.todo_tasks_sevice])):
    return ReturnResponse(todo_task_service.get_user_todo(access_token))


@todo_router.post("/add")
@inject
async def create_todo(task: TodoInfo,
                      access_token: str | None = Cookie(default=None),
                      todo_task_service: TodoTaskService = Depends(Provide[Container.todo_tasks_sevice])):
    return ReturnResponse(todo_task_service.create_todo(task.category, task.description, task.due_date, task.priority, access_token))


@todo_router.post("/upd")
@inject
async def upd_todo(task: TodoUpd,
                   access_token: str | None = Cookie(default=None),
                   todo_task_service: TodoTaskService = Depends(Provide[Container.todo_tasks_sevice])):
    return ReturnResponse(todo_task_service.upd_todo(task.category, task.description, task.due_date, task.priority, task.task_id, access_token))


@todo_router.post("/del")
@inject
async def del_todo(task: DeleteTask,
                   access_token: str | None = Cookie(default=None),
                   todo_task_service: TodoTaskService = Depends(Provide[Container.todo_tasks_sevice])):
    return ReturnResponse(todo_task_service.del_todo(task.task_id, access_token))
