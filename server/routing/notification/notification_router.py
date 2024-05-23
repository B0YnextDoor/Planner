from fastapi import APIRouter, Cookie, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError
from schemas.notification.notification_schemas import NotificationBase
from services.notification.notification_service import NotificationService


notification_router = APIRouter(
    prefix='/notification', tags=['notification'])


@notification_router.get("/all")
@inject
async def get_all(notification_service: NotificationService = Depends(Provide[Container.notification_service])):
    return notification_service.get_all()


@notification_router.get("/user")
@inject
async def get_user_notifications(access_token: str | None = Cookie(default=None),
                                 notification_service: NotificationService = Depends(Provide[Container.notification_service])):
    response = notification_service.get_user_notifications(access_token)
    if response is None:
        raise NotFoundError('user not found')
    return response


@notification_router.post('/del')
@inject
async def delete_notification(note: NotificationBase,
                              access_token: str | None = Cookie(default=None),
                              notification_service: NotificationService = Depends(Provide[Container.notification_service])):
    response = notification_service.delete_notification(access_token, note.id)
    if response is None:
        raise NotFoundError('user not found')
    return response
