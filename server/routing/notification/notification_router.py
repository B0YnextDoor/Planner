from fastapi import APIRouter, Cookie, Depends
from fastapi.responses import JSONResponse
from dependency_injector.wiring import inject, Provide
from container.container import Container
from core.server_exceptions import NotFoundError
from services.notification.notification_service import NotificationService


notification_router = APIRouter(prefix='/notification', tags=['notification'])


@notification_router.get("/all")
@inject
async def get_all(notification_service: NotificationService = Depends(Provide[Container.notification_service])):
    return notification_service.get_all()


@notification_router.post("/user")
@inject
async def get_user_notifications(access_token: str | None = Cookie(default=None),
                                 notification_service: NotificationService = Depends(Provide[Container.notification_service])):
    response = notification_service.get_user_notifications(access_token)
    if response is None:
        raise NotFoundError('user not found')
    return response
