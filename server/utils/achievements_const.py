from schemas.achievement.achievement_schemas import AchievementFull


db_achievements: list[AchievementFull] = [
    AchievementFull(rules_to_achive="reg", title="Приветствуем!",
                    description="За регистрацию"),
    AchievementFull(rules_to_achive="pro", title="Настоящий профи!",
                    description="За приобретение PRO статуса"),
    AchievementFull(rules_to_achive="task1", title="Первая задача!",
                    description="За создание первой задачи"),
    AchievementFull(rules_to_achive="task10", title="Десяточка!",
                    description="За создание 10 задач"),
    AchievementFull(rules_to_achive="task50", title="Полсотни!",
                    description="За создание 50 задач"),
    AchievementFull(rules_to_achive="task1_fin",
                    title="Доводим дело до конца!", description="За завершение первой задачи"),
    AchievementFull(rules_to_achive="task10_fin", title="Уверенное продолжение!",
                    description="За завершение 10 задач"),
    AchievementFull(rules_to_achive="task50_fin", title="Настоящая дисциплина!",
                    description="За завершение 50 задач"),
    AchievementFull(rules_to_achive="org", title="Добро пожаловать в команду!",
                    description="За вступление в организацию!"),
    AchievementFull(rules_to_achive="org_head", title="Большой дядя!",
                    description="За создание собственной организации")

]
