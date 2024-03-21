import { IKanbanTask } from '@/types/tasks/kanban/kanban.types'

export const filterTasks = (
	tasks: IKanbanTask[] | undefined,
	value: string
) => {
	if (!tasks) return []
	switch (value) {
		case 'todo':
			return tasks.filter(item => item.category === 'todo')
		case 'in process':
			return tasks.filter(item => item.category === 'in process')
		case 'done':
			return tasks.filter(item => item.category === 'done')
		default:
			return []
	}
}
