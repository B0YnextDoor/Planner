import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import { FILTERS } from './todo.data'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const filterTasks = (tasks: ITodoTask[] | undefined, value: string) => {
	switch (value) {
		case 'today':
			return tasks?.filter(
				item =>
					dayjs(item.due_date).isSame(FILTERS.today, 'day') &&
					item.category != 'finished' &&
					item.category != 'overdued'
			)

		case 'tomorrow':
			return tasks?.filter(
				item =>
					dayjs(item.due_date).isSame(FILTERS.tomorrow, 'day') &&
					item.category != 'finished' &&
					item.category != 'overdued'
			)

		case 'on-this-week':
			return tasks?.filter(
				item =>
					!dayjs(item.due_date).isSame(FILTERS.today) &&
					!dayjs(item.due_date).isSame(FILTERS.tomorrow) &&
					dayjs(item.due_date).isSameOrBefore(FILTERS['on-this-week']) &&
					item.category != 'finished' &&
					item.category != 'overdued'
			)

		case 'on-next-week':
			return tasks?.filter(
				item =>
					dayjs(item.due_date).isAfter(FILTERS['on-this-week']) &&
					dayjs(item.due_date).isSameOrBefore(FILTERS['on-next-week']) &&
					item.category != 'finished' &&
					item.category != 'overdued'
			)

		case 'later':
			return tasks?.filter(
				item =>
					(dayjs(item.due_date).isAfter(FILTERS['on-next-week']) ||
						!item.due_date) &&
					item.category != 'finished' &&
					item.category != 'overdued'
			)

		case 'finished':
			return tasks?.filter(item => item.category === 'finished')

		case 'overdued':
			return tasks?.filter(item => item.category === 'overdued')

		default:
			return []
	}
}
