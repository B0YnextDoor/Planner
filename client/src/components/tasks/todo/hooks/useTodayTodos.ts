import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import { findDayTasks, getCurrentDate, getTaskDate } from '../utils/todo.find'

export interface ICalendarDay {
	tasks: ITodoTask[] | undefined
	setItems: Dispatch<SetStateAction<ITodoTask[] | undefined>>
	day: number
}

export const useTodayTodos = ({ tasks, setItems, day }: ICalendarDay) => {
	const date = useMemo(() => getTaskDate(day), [day])
	const { currentDate } = useMemo(() => getCurrentDate(), [day])
	const [todayTasks, setTodayTasks] = useState<ITodoTask[] | undefined>(tasks)
	const addTask = () => {
		if (date < currentDate) {
			toast.error("You can't add overdued task!")
			return
		}
		setItems((prev: any) => {
			if (!prev) return
			return [
				...prev,
				{
					task_id: null,
					category: 'active',
					description: '',
					due_date: date.format(),
					time_overdue: 0,
					priority: '',
					isCompleted: false
				}
			]
		})
	}

	useEffect(() => {
		if (tasks) setTodayTasks(findDayTasks(tasks, day))
	}, [tasks])

	return { todayTasks, currentDate, addTask }
}
