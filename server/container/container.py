from dependency_injector import containers, providers
from core.config import configs
from database.database import Database
from repositories.achievements.achievemets_repository import AchievementsRepository
from repositories.daily_routine.pro_repository import ProCodeRepository
from repositories.daily_routine.routine_template_repository import RoutineTemplateRepository
from repositories.group.group_repository import CustomTaskGroupRepository
from repositories.notification.notification_repository import NotificationRepository
from repositories.organisation.organisation_repository import OrganisationRepository
from repositories.daily_routine.routine_repository import RoutineRepository
from repositories.statistics.statistics_repository import StatisticsRepository
from repositories.tasks.custom.custom_tasks_repository import CustomTaskRepository
from repositories.tasks.kanban.kanban_tasks_repository import KanbanTaskRepository
from repositories.tasks.organisation.organisation_tasks_repository import OrganisationTaskRepository
from repositories.tasks.todo.todo_tasks_repository import TodoTaskRepository
from repositories.timer.timer_repository import TimerRepository
from repositories.user.user_repository import UserRepository
from services.achievements.achievements_service import AchievementsService
from services.auth.auth_service import AuthService
from services.daily_routine.pro_service import ProService
from services.daily_routine.routine_templates_service import RoutineTemplateService
from services.group.group_service import CustomTaskGroupService
from services.notification.notification_service import NotificationService
from services.organisation.organisation_service import OrganisationService
from services.daily_routine.routine_service import RoutineService

from services.statistics.statistics_service import StatisticsService
from services.tasks.custom.custom_task_service import CustomTaskService
from services.tasks.kanban.kanban_task_service import KanbanTaskService
from services.tasks.organisation.organisation_tasks_service import OrganisationTaskService
from services.tasks.todo.todo_task_service import TodoTaskService
from services.timer.timer_service import TimerService
from services.user.user_service import UserService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            'routing.user.user_router',
            'routing.auth.auth_router',
            'routing.timer.timer_router',
            'routing.achievements.achievements_router',
            'routing.daily_routine.routine_router',
            'routing.daily_routine.routine_template_router',
            'routing.daily_routine.pro_router',
            'routing.statistics.statistics_router',
            'routing.organisation.organisation_router',
            'routing.notification.notification_router',
            'routing.tasks.todo.todo_tasks_router',
            'routing.tasks.kanban.kanban_tasks_router',
            'routing.tasks.organisation.organisation_tasks_router',
            'routing.tasks.custom.custom_tasks_router',
            'routing.group.group_router',
        ]
    )

    db = providers.Singleton(Database, db_url=configs.DATABASE_URI)

    user_repository = providers.Factory(
        UserRepository, session_factory=db.provided.session)
    timer_repository = providers.Factory(
        TimerRepository, session_factory=db.provided.session)
    achievements_repository = providers.Factory(
        AchievementsRepository, session_factory=db.provided.session)
    routine_repository = providers.Factory(
        RoutineRepository, session_factory=db.provided.session)
    template_repository = providers.Factory(
        RoutineTemplateRepository, session_factory=db.provided.session)
    pro_repository = providers.Factory(
        ProCodeRepository, session_factory=db.provided.session)
    statistics_repository = providers.Factory(
        StatisticsRepository, session_factory=db.provided.session)
    organisation_repository = providers.Factory(
        OrganisationRepository, session_factory=db.provided.session)
    notification_repository = providers.Factory(
        NotificationRepository, session_factory=db.provided.session)
    todo_tasks_repository = providers.Factory(
        TodoTaskRepository, session_factory=db.provided.session)
    kanban_tasks_repository = providers.Factory(
        KanbanTaskRepository, session_factory=db.provided.session)
    organisation_tasks_repository = providers.Factory(
        OrganisationTaskRepository, session_factory=db.provided.session)
    custom_tasks_repository = providers.Factory(
        CustomTaskRepository, session_factory=db.provided.session)
    group_repository = providers.Factory(
        CustomTaskGroupRepository, session_factory=db.provided.session)

    user_service = providers.Factory(
        UserService, user_repository=user_repository)
    auth_service = providers.Factory(
        AuthService, auth_repository=user_repository)
    timer_service = providers.Factory(
        TimerService, timer_repository=timer_repository)
    achievements_service = providers.Factory(
        AchievementsService, achievements_repository=achievements_repository)
    routine_service = providers.Factory(
        RoutineService, routine_repository=routine_repository)
    template_service = providers.Factory(
        RoutineTemplateService, template_repository=template_repository)
    pro_service = providers.Factory(
        ProService, pro_repository=pro_repository)
    statistics_service = providers.Factory(
        StatisticsService, statistics_repository=statistics_repository)
    organisation_service = providers.Factory(
        OrganisationService, organisation_repository=organisation_repository)
    notification_service = providers.Factory(
        NotificationService, notification_repository=notification_repository)
    todo_tasks_sevice = providers.Factory(
        TodoTaskService, todo_tasks_repository=todo_tasks_repository)
    kanban_tasks_service = providers.Factory(
        KanbanTaskService, kanban_tasks_repository=kanban_tasks_repository)
    organisation_tasks_service = providers.Factory(
        OrganisationTaskService, organisation_tasks_repository=organisation_tasks_repository)
    custom_tasks_service = providers.Factory(
        CustomTaskService, custom_tasks_repository=custom_tasks_repository)
    group_service = providers.Factory(
        CustomTaskGroupService, group_repository=group_repository)
