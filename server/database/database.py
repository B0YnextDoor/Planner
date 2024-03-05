from contextlib import AbstractContextManager, contextmanager
from typing import Any, Generator
from sqlalchemy import Column, Integer, create_engine
from sqlalchemy.orm import Session, sessionmaker, DeclarativeBase


class BaseModel(DeclarativeBase):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)


class Database:
    def __init__(self, db_url: str) -> None:
        self._engine = create_engine(db_url, echo=True)
        self._session_maker = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self._engine,
        )

    def create_database(self) -> None:
        BaseModel.metadata.create_all(self._engine)

    @contextmanager
    def session(self) -> Generator[AbstractContextManager[Session], Any, Any]:
        session: Session = self._session_maker()
        try:
            yield session
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
