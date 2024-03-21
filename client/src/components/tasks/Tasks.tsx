'use client'

import { Loader } from '@/components/ui/loader/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { TaskSwitcher, TypeTaskView } from './TaskSwitcher'
import { KanbanView } from './kanban/widgets/KanbanView'
import { TodoCalendarView } from './todo/calendar-widgets/TodoCalendarView'
import { TodoListView } from './todo/list-widgets/TodoListView'

export const Tasks = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeTaskView>({
		key: 'view-type',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader size={20} />
	return (
		<div>
			<TaskSwitcher
				type={type}
				setType={setType}
			/>
			{type == 'list' ? (
				<TodoListView />
			) : type == 'kanban' ? (
				<KanbanView />
			) : (
				<TodoCalendarView />
			)}
		</div>
	)
}
