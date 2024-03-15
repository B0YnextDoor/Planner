'use client'

import { Loader } from '@/components/ui/loader/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { TaskSwitcher, TypeView } from './TaskSwitcher'
import { TodoCalendarView } from './todo/calendar-widgets/TodoCalendarView'
import { TodoListView } from './todo/list-widgets/TodoListView'

export const Tasks = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader />
	return (
		<div>
			<TaskSwitcher
				type={type}
				setType={setType}
			/>
			{type == 'list' ? <TodoListView /> : <TodoCalendarView />}
		</div>
	)
}
