import { useCallback, useEffect, useState } from 'react'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import { getCurrentDate, getMonthTasks } from '../utils/todo.find'

import { useTodoTasks } from './useTodoTasks'

export const useTodoCalendar = () => {
	const { items, setItems } = useTodoTasks()
	const { month, monthBegin, monthEnd } = getCurrentDate()
	const [monthTasks, setMonthTasks] = useState<ITodoTask[]>()
	useEffect(() => {
		if (items) setMonthTasks(getMonthTasks(items, monthBegin, monthEnd))
	}, [items])
	return { setItems, monthBegin, month, monthTasks }
}
