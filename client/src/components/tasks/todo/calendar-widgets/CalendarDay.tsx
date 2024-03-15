import cn from 'clsx'
import { Plus } from 'lucide-react'

import { ICalendarDay, useTodayTodos } from '../hooks/useTodayTodos'

import styles from './Calendar.module.css'
import { CalendarTask } from './CalendarTask'

export const CalendarDay = ({ tasks, day, setItems }: ICalendarDay) => {
	const { currentDate, addTask, todayTasks } = useTodayTodos({
		tasks,
		day,
		setItems
	})

	return (
		<div className={styles.calendarDay}>
			<div
				className={cn(
					'absolute top-0 left-1 font-mono text-[16px]',
					day == currentDate.date() && 'text-primary'
				)}
			>
				{day}
			</div>
			<button
				className='absolute top-0 right-0 opacity-30 hover:opacity-100 transition-opacity'
				onClick={addTask}
			>
				<Plus size={20} />
			</button>
			{todayTasks &&
				todayTasks.map((item, index) => (
					<CalendarTask
						item={item}
						setItems={setItems}
						key={index}
					/>
				))}
		</div>
	)
}
