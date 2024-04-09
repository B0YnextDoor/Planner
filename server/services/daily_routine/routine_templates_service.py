from core.security import decode_token
from repositories.daily_routine.routine_template_repository import RoutineTemplateRepository


class RoutineTemplateService:
    def __init__(self, template_repository: RoutineTemplateRepository) -> None:
        self.template_repository = template_repository

    def get_user_templates(self, token: str):
        user = decode_token(token)
        if user is None:
            return None
        response = self.template_repository.get_user_templates(
            user.get('user'))
        if response is None:
            return None
        templates = []
        for template in response:
            templates.append(
                {'template_id': template.id, 'name': template.name, 'time': template.sleep_time})
        return templates

    def create_template(self, sleep_time: int, habits: list[int], token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.template_repository.create_template(sleep_time, habits, user.get('user'))

    def update_template(self, name: str, template_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.template_repository.update_template(name, template_id, user.get('user'))

    def update_template_habits(self, template_id: int, time: int, habits: list[int], token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.template_repository.update_template_habits(template_id, time, habits, user.get('user'))

    def delete_template(self, template_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.template_repository.delete_template(template_id, user.get('user'))

    def load_template(self, template_id: int, token: str):
        user = decode_token(token)
        if user is None:
            return None
        return self.template_repository.load_template(template_id, user.get('user'))
