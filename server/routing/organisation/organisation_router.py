from fastapi import APIRouter, Cookie, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError, ValidationError
from schemas.organisation.organisation_schemas import DeleteMember, JoinOrganisation, OrganisationSettings
from schemas.user.user_shemas import UserBase
from services.organisation.organisation_service import OrganisationService


def ReturnResponse(response):
    if response is None:
        raise NotFoundError('user not found')
    elif response == 'no org':
        raise ValidationError('organisation not found')
    elif response == 'already exists':
        raise ValidationError('Organisation already exists!')
    elif response == 'not head':
        raise ValidationError('not head of organosation')
    elif response == 'head of org':
        raise ValidationError('User is already in organisation!')
    elif response == 'code expired':
        raise ValidationError('Invitation code expired!')
    elif response == 'no member':
        raise ValidationError('User not found')
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
async def delete_by_id(access_token: str | None = Cookie(default=None),
                       organisation_service: OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.del_by_id(access_token))


@organisation_router.get("/get-by-user")
@inject
async def get_by_user(access_token: str | None = Cookie(default=None),
                      organisation_service: OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.get_user_organisation(access_token))


@organisation_router.get("/members")
@inject
async def get_organisation_members(access_token: str | None = Cookie(default=None),
                                   organisation_service: OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.get_organisation_members(access_token))


@organisation_router.post("/create")
@inject
async def create_organisation(data: OrganisationSettings,
                              access_token: str | None = Cookie(default=None),
                              organisation_service:
                              OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.create_organisation(access_token, data.name, data.description))


@organisation_router.put("/upd-settings")
@inject
async def upd_organisation_settings(data: OrganisationSettings,
                                    access_token: str | None = Cookie(
                                        default=None),
                                    organisation_service:
                                    OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.upd_organisation_settings(
        access_token, data.name, data.description))


@organisation_router.post("/invite-user")
@inject
async def invite_new_user(data: UserBase,
                          access_token: str | None = Cookie(default=None),
                          organisation_service:
                          OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.invite_to_organisation(access_token, data.email))


@organisation_router.post("/join")
@inject
async def join_organisation(member: JoinOrganisation,
                            access_token: str | None = Cookie(default=None),
                            organisation_service:
                            OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.join_organisation(access_token, member.invite_code))


@organisation_router.post("/leave")
@inject
async def leave_organisation(access_token: str | None = Cookie(default=None),
                             organisation_service:
                             OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.leave_organisation(access_token))


@organisation_router.post("/delete-member")
@inject
async def delete_organisation_member(data: DeleteMember,
                                     access_token: str | None = Cookie(
                                         default=None),
                                     organisation_service:
                                     OrganisationService = Depends(Provide[Container.organisation_service])):
    return ReturnResponse(organisation_service.delete_organisation_member(access_token, data.member_id))
