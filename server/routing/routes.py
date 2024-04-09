from fastapi import APIRouter

from routing.user.user_router import user_router
from routing.auth.auth_router import auth_router
from routing.timer.timer_router import timer_router
from routing.achievements.achievements_router import achievements_router
from routing.daily_routine.routine_router import routine_router
from routing.daily_routine.routine_template_router import template_router
from routing.daily_routine.pro_router import pro_router
from routing.statistics.statistics_router import statistics_router
from routing.organisation.organisation_router import organisation_router
from routing.notification.notification_router import notification_router
from routing.tasks.todo.todo_tasks_router import todo_router
from routing.tasks.kanban.kanban_tasks_router import kanban_router
from routing.tasks.organisation.organisation_tasks_router import organisation_tasks_router
from routing.tasks.custom.custom_tasks_router import custom_tasks_router
from routing.group.group_router import group_router

routers = APIRouter()
routes = [user_router, auth_router, timer_router,
          achievements_router, routine_router, template_router, pro_router, statistics_router, organisation_router, notification_router, todo_router, kanban_router, organisation_tasks_router, custom_tasks_router, group_router]

for route in routes:
    routers.include_router(route)
