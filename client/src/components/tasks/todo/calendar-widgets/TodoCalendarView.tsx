import { useTodoCalendar } from '../hooks/useTodoCalendar'

import styles from './Calendar.module.css'
import { CalendarDay } from './CalendarDay'

const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

export const TodoCalendarView = () => {
	const { monthTasks, month, setItems, monthBegin } = useTodoCalendar()
	return (
		<div className={styles.calendar}>
			{days.map(day => (
				<div
					key={day}
					className='font-semibold text-center'
				>
					{day}
				</div>
			))}
			{month.map((day, index) =>
				day ? (
					<CalendarDay
						day={index + 2 - monthBegin.getDay()}
						tasks={monthTasks}
						setItems={setItems}
						key={index}
					/>
				) : (
					<div key={index} />
				)
			)}
		</div>
	)
}
