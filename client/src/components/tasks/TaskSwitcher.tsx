'use client'

import cn from 'clsx'
import { CalendarDays, Kanban, ListTodo } from 'lucide-react'

import { ISwitcherView } from '@/types/ui/switcher/switcher.type'

import styles from './Tasks.module.css'

export type TypeTaskView = 'list' | 'kanban' | 'calendar'

export const TaskSwitcher = ({
	setType,
	type
}: ISwitcherView<TypeTaskView>) => {
	return (
		<div className={styles.switcher}>
			<button
				className={cn({
					'opacity-40': type === 'kanban' || type === 'calendar'
				})}
				onClick={() => setType('list')}
			>
				<ListTodo />
				List
			</button>
			<button
				className={cn({
					'opacity-40': type === 'list' || type == 'calendar'
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Board
			</button>
			<button
				className={cn({
					'opacity-40': type === 'kanban' || type === 'list'
				})}
				onClick={() => setType('calendar')}
			>
				<CalendarDays />
				Calendar
			</button>
		</div>
	)
}
