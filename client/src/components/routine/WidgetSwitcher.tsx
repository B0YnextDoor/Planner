'use client'

import cn from 'clsx'
import { FolderSearch, ListTodo } from 'lucide-react'

import { ISwitcherView } from '@/types/ui/switcher/switcher.type'

import styles from './Routine.module.css'

export type TypeWidgetSwitcher = 'routine' | 'templates'

export const WidgetSwitcher = ({
	type,
	setType
}: ISwitcherView<TypeWidgetSwitcher>) => {
	return (
		<div className={styles.switcher}>
			<button
				className={cn({
					'opacity-40': type === 'templates'
				})}
				onClick={() => setType('routine')}
			>
				<ListTodo />
				Routine
			</button>
			<button
				className={cn({
					'opacity-40': type === 'routine'
				})}
				onClick={() => setType('templates')}
			>
				<FolderSearch />
				Templates
			</button>
		</div>
	)
}
