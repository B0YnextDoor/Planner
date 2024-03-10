from fastapi import APIRouter, Depends, Cookie
from core.server_exceptions import NotFoundError, ValidationError
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from schemas.group.group_schemas import GroupDel, GroupInfo, GroupUpd
from services.group.group_service import CustomTaskGroupService


def ReturnResponse(response):
    if response is None:
        return NotFoundError('user not found')
    elif response == 'no-parent':
        return ValidationError('parent group not found')
    elif response == 'no groups':
        return ValidationError('user have no task groups')
    elif response == 'no group':
        return ValidationError('group not found')
    elif response == 'no child':
        return ValidationError('child groups not found')
    return response


group_router = APIRouter(prefix='/tasks/groups', tags=['task-groups'])


@group_router.get("/all")
@inject
async def get_all(group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return group_service.get_all()


@group_router.post("/user-groups")
@inject
async def get_user_groups(access_token: str | None = Cookie(default=None),
                          group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.get_user_groups(access_token))


@group_router.post("/add")
@inject
async def create_new_group(group: GroupInfo,
                           access_token: str | None = Cookie(default=None),
                           group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.create_user_group(group.group_name, group.parent_group_id, access_token))


@group_router.post("/upd")
@inject
async def update_group(group: GroupUpd,
                       access_token: str | None = Cookie(default=None),
                       group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.upd_user_group(group.group_name, group.parent_group_id, group.child_group_id, group.group_id, access_token))


@group_router.post("/del")
@inject
async def delete_group(group: GroupDel,
                       access_token: str | None = Cookie(default=None),
                       group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.del_user_group(group.group_id, access_token))
