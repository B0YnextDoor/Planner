import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Configs(BaseSettings):
    # base
    ENV: str = os.getenv("ENV", "dev")
    API: str = "/api"
    PROJECT_NAME: str = "planner"
    ENV_DATABASE_MAPPER: dict = {
        "prod": "planner",
        "stage": "stage-planner",
        "dev": "dev-planner",
        "test": "test-planner",
    }

    # auth
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN: str = "access_token"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN: str = "refresh_token"
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 24*60

    # database
    DB: str = os.getenv("DB", "postgresql")
    DB_USER: str | None = os.getenv("DB_USER")
    DB_PASSWORD: str | None = os.getenv("DB_PASSWORD")
    DB_HOST: str | None = os.getenv("DB_HOST")
    DB_PORT: str | None = os.getenv("DB_PORT", "3306")
    DB_ENGINE: str = "postgresql"

    DATABASE_URI: str = "sqlite:///./database/sql_app.db"
    # DATABASE_URI: str = "{db_engine}://{user}:{password}@{host}:{port}/{database}".format(
    #     db_engine=DB_ENGINE,
    #     user=DB_USER,
    #     password=DB_PASSWORD,
    #     host=DB_HOST,
    #     port=DB_PORT,
    #     database=ENV_DATABASE_MAPPER[ENV],
    # )
    CASCADE: str = 'all, delete-orphan'
    PRO_CODE: str = 'i am a pro'

    class Config:
        case_sensitive = True


configs = Configs()
