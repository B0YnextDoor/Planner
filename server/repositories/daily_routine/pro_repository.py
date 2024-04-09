from contextlib import AbstractContextManager
from sqlalchemy.exc import IntegrityError
from typing import Callable
from sqlalchemy.orm import Session
from models.daily_routine.daily_routine_model import DailyRoutine
from models.daily_routine.pro_code_model import ProCode
from models.user.user_model import User
from core.security import generateProCodes


class ProCodeRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self.session_factory = session_factory
        with session_factory() as session:
            dbcodes = session.query(ProCode).all()
            if dbcodes is not None and len(dbcodes) > 0:
                return None
            self.generateCodes()

    def get_all(self):
        with self.session_factory() as session:
            return session.query(ProCode).all()

    def generateCodes(self):
        codes = generateProCodes()
        for code in codes:
            self.add_pro_code(code)

    def add_pro_code(self, code: str):
        with self.session_factory() as session:
            try:
                pro_code = ProCode(code)
                session.add(pro_code)
                session.commit()
                session.refresh(pro_code)
            except IntegrityError:
                raise IntegrityError()
            return None

    def buy_user_pro(self, id: int, pro_code: str):
        with self.session_factory() as session:
            try:
                db_user = session.query(User).filter(User.id == id).first()
                if db_user is None:
                    return None
                db_code = session.query(ProCode).filter(
                    ProCode.code == pro_code).first()
                if db_code is None:
                    return 'wrong code'
                db_user.is_pro = True
                db_user.achievements[2] = ""
                daily_routine = DailyRoutine(db_user.id)
                session.add(daily_routine)
                session.delete(db_code)
                session.commit()
                session.refresh(daily_routine)
                session.refresh(db_user)
                codes = self.get_all()
                if codes is None or len(codes) == 0:
                    self.generateCodes()
            except IntegrityError:
                raise IntegrityError()
            return 'Success'
