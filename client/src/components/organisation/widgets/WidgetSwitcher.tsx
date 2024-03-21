'use client'

import cn from 'clsx'
import { AreaChart, Kanban, Users } from 'lucide-react'

import { ISwitcherView } from '@/types/ui/switcher/switcher.type'

import styles from './Organisation.module.css'

export type TypeWidgetSwitcher = 'board' | 'membs' | 'tasks'

export const WidgetSwitcher = ({
	type,
	setType
}: ISwitcherView<TypeWidgetSwitcher>) => {
	return (
		<div className={styles.switcher}>
			<button
				className={cn({
					'opacity-40': type === 'tasks' || type == 'membs'
				})}
				onClick={() => setType('board')}
			>
				<AreaChart />
				Dashboard
			</button>
			<button
				className={cn({
					'opacity-40': type === 'board' || type == 'membs'
				})}
				onClick={() => setType('tasks')}
			>
				<Kanban />
				Tasks
			</button>
			<button
				className={cn({
					'opacity-40': type === 'board' || type == 'tasks'
				})}
				onClick={() => setType('membs')}
			>
				<Users />
				Members
			</button>
		</div>
	)
}
