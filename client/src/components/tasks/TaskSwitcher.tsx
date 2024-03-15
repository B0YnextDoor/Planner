'use client'

import cn from 'clsx'
import { CalendarDays, Kanban, ListTodo } from 'lucide-react'

export type TypeView = 'list' | 'kanban' | 'calendar'

interface ISwitcherView {
	type: TypeView
	setType: (value: TypeView) => void
}

export const TaskSwitcher = ({ setType, type }: ISwitcherView) => {
	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'kanban' || type === 'calendar'
				})}
				onClick={() => setType('list')}
			>
				<ListTodo />
				List
			</button>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'list' || type == 'calendar'
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Board
			</button>
			<button
				className={cn('flex items-center gap-1', {
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
