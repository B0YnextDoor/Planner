import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITimerState } from '@/types/timer/timer.types'

import { useTimerSettings } from './useTimerSettings'
import { timerService } from '@/services/timer/timer.service'

export const useCurrentSession = ({
	rounds,
	isBreakTime,
	setRounds,
	setActiveRound,
	setSecondsLeft
}: ITimerState) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const { work_interval } = useTimerSettings()
	const {
		data: session,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ['current session'],
		queryFn: () => timerService.currentSession(),
		retry: 0
	})
	useEffect(() => {
		setIsActive(false)
		if (isSuccess && session) {
			setActiveRound(session.data.current_lap)
			setSecondsLeft(
				isBreakTime
					? session.data.total_rest_seconds
					: session.data.total_work_seconds
			)
			for (var i = 0; i < session.data.current_lap; ++i) {
				rounds[i] = { is_work: true, is_active: false, is_completed: true }
			}
			setRounds(rounds)
			setIsActive(true)
		}
	}, [isSuccess, session])

	return { session, isLoading, work_interval, isActive }
}
