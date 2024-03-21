from fastapi import APIRouter, Depends, Cookie
from core.server_exceptions import NotFoundError, ValidationError
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from container.container import Container
from schemas.group.group_schemas import GroupDel, GroupInfo, GroupUpd, ParentGroup
from services.group.group_service import CustomTaskGroupService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no-parent':
        raise ValidationError('parent group not found')
    elif response == 'no groups':
        raise ValidationError('user have no task groups')
    elif response == 'no group':
        raise ValidationError('group not found')
    return response


group_router = APIRouter(prefix='/tasks/groups', tags=['task-groups'])


@group_router.get("/all")
@inject
async def get_all(group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return group_service.get_all()


@group_router.post("/user-groups")
@inject
async def get_user_groups(parent: ParentGroup,
                          access_token: str | None = Cookie(default=None),
                          group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.get_user_groups(access_token, parent.parent))


@group_router.post("/add")
@inject
async def create_new_group(group: GroupInfo,
                           access_token: str | None = Cookie(default=None),
                           group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.create_user_group(group.group_name, group.parent, access_token))


@group_router.post("/upd")
@inject
async def update_group(group: GroupUpd,
                       access_token: str | None = Cookie(default=None),
                       group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.upd_user_group(group.group_name, group.parent, group.group_id, access_token))


@group_router.post("/del")
@inject
async def delete_group(group: GroupDel,
                       access_token: str | None = Cookie(default=None),
                       group_service: CustomTaskGroupService = Depends(Provide[Container.group_service])):
    return ReturnResponse(group_service.del_user_group(group.group_id, access_token))
