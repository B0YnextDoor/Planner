from schemas.achievement.achievement_schemas import Achievement


db_achievements: list[Achievement] = [
    Achievement(title="Приветствуем!",
                description="За регистрацию"),
    Achievement(title="Настоящий профи!",
                description="За приобретение PRO статуса"),
    Achievement(title="Первая задача!",
                description="За создание первой задачи"),
    Achievement(title="Десяточка!",
                description="За создание 10 задач"),
    Achievement(title="Полсотни!",
                description="За создание 50 задач"),
    Achievement(title="Доводим дело до конца!",
                description="За завершение первой задачи"),
    Achievement(title="Уверенное продолжение!",
                description="За завершение 10 задач"),
    Achievement(title="Настоящая дисциплина!",
                description="За завершение 50 задач"),
    Achievement(title="Добро пожаловать в команду!",
                description="За вступление в организацию!"),
    Achievement(title="Большой дядя!",
                description="За создание собственной организации")

]
