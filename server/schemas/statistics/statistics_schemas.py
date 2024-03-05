from schemas.token.token_schemas import TokenBase


class StatisticsInfo(TokenBase):
    amount_of_tasks: int
    finished_tasks: int


class UserStatistics(StatisticsInfo):
    overdued_tasks: int
