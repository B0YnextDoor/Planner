import dayjs, { type Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(utc)

export const FILTERS: Record<string, Dayjs> = {
	today: dayjs().startOf('day'),
	tomorrow: dayjs().add(1, 'day').startOf('day'),
	'on-this-week': dayjs().endOf('isoWeek').startOf('day'),
	'on-next-week': dayjs().add(1, 'week').startOf('day'),
	later: dayjs().add(2, 'week').startOf('day')
}

export const CATEGORIES = [
	{
		label: 'Today',
		id: 'today'
	},
	{
		label: 'Tomorrow',
		id: 'tomorrow'
	},
	{
		label: 'On this week',
		id: 'on-this-week'
	},
	{
		label: 'On next week',
		id: 'on-next-week'
	},
	{
		label: 'Later',
		id: 'later'
	},
	{
		label: 'Completed',
		id: 'finished'
	}
]
