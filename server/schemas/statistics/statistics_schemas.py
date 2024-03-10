from pydantic import BaseModel


class StatisticsInfo(BaseModel):
    amount_of_tasks: int
    finished_tasks: int


class UserStatistics(StatisticsInfo):
    overdued_tasks: int
