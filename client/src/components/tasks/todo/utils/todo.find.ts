import dayjs from 'dayjs'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

export const getCurrentDate = () => {
	const currentDate = dayjs().startOf('day')
	const monthBegin = new Date(currentDate.year(), currentDate.month(), 1)
	const monthEnd = new Date(currentDate.year(), currentDate.month() + 1, 0)
	const month = new Array(monthBegin.getDay())
		.fill(false)
		.concat(new Array(monthEnd.getDate()).fill(true))
	return { currentDate, monthBegin, monthEnd, month }
}

export const getTaskDate = (day: number) => {
	const { currentDate } = getCurrentDate()
	return dayjs()
		.year(currentDate.year())
		.month(currentDate.month())
		.date(day)
		.startOf('day')
}

export const getMonthTasks = (
	items: ITodoTask[],
	monthBegin: Date,
	monthEnd: Date
) => {
	return items.filter(
		item =>
			item.due_date &&
			dayjs(item.due_date).isSameOrAfter(monthBegin) &&
			dayjs(item.due_date).isSameOrBefore(monthEnd)
	)
}

export const findDayTasks = (items: ITodoTask[] | undefined, day: number) => {
	const date = getTaskDate(day)
	return items?.filter(item => dayjs(item.due_date).isSame(date))
}
