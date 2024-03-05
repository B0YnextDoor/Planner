from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.organisation.organisation_schemas import DeleteMember, InviteUser, JoinOrganisation, OrganisationSettings
from schemas.token.token_schemas import TokenBase
from services.organisation.organisation_service import OrganisationService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no org':
        raise ValidationError('organisation not found')
    elif response == 'already exists':
        raise ValidationError('organisation already exists')
    elif response == 'not head':
        raise ValidationError('not head of organosation')
    elif response == 'head of org':
        raise ValidationError('already in organisation')
    elif response == 'code expired':
        raise ValidationError('invite code expired')
    elif response == 'no member':
        raise ValidationError('can\'t delete member')
    return response


organisation_router = APIRouter(prefix='/organisation', tags=['organisation'])


@organisation_router.get("/all")
@inject
async def get_all(organisation_service:
                  OrganisationService = Depends(Provide[Container.organisation_service])):
    return organisation_service.get_all()


@organisation_router.delete("/del-all")
@inject
async def delete_all(organisation_service:
                     OrganisationService = Depends(Provide[Container.organisation_service])):
    return organisation_service.del_all()


@organisation_router.delete("/delete-by-id")
@inject
async def delete_by_id(token: TokenBase,
                       organisation_service: OrganisationService = Depends(Provide[Container.organisation_service])):
    return organisation_service.del_by_id(token.access_token)


@organisation_router.post("/get-by-user")
@inject
async def get_by_user(token: TokenBase,
                      organisation_service: OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.get_user_organisation(token.access_token))


@organisation_router.post("/members")
@inject
async def get_organisation_members(token: TokenBase,
                                   organisation_service: OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.get_organisation_members(token.access_token))


@organisation_router.post("/create")
@inject
async def create_organisation(data: OrganisationSettings, organisation_service:
                              OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.create_organisation(data.access_token, data.name, data.description))


@organisation_router.post("/upd-settings")
@inject
async def upd_organisation_settings(data: OrganisationSettings, organisation_service:
                                    OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.upd_organisation_settings(
        data.access_token, data.name, data.description))


@organisation_router.post("/invite-user")
@inject
async def invite_new_user(data: InviteUser, organisation_service:
                          OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.invite_to_organisation(data.access_token, data.email, data.invite_code))


@organisation_router.post("/join")
@inject
async def join_organisation(member: JoinOrganisation, organisation_service:
                            OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.join_organisation(member.access_token, member.invite_code))


@organisation_router.post("/leave")
@inject
async def leave_organisation(member: TokenBase, organisation_service:
                             OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.leave_organisation(member.access_token))


@organisation_router.post("/delete-member")
@inject
async def delete_organisation_member(data: DeleteMember, organisation_service:
                                     OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.delete_organisation_member(data.access_token, data.member_id))