from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import configs
from container.container import Container
from utils.singleton import singleton
from routing.routes import routers


@singleton
class AppCreator:
    def __init__(self):
        self.app = FastAPI(
            title=configs.PROJECT_NAME,
        )

        # set db and container
        self.container = Container()
        self.db = self.container.db()
        self.db.create_database()

        # set cors
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        # set routes
        @self.app.get("/")
        def root():
            return "service is working"

        self.app.include_router(routers)


app_creator = AppCreator()
app = app_creator.app
# db = app_creator.db
# container = app_creator.container
