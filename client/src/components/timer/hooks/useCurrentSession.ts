import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

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
	const { work_interval } = useTimerSettings()
	const {
		data: session,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ['current session'],
		queryFn: () => timerService.currentSession()
	})
	useEffect(() => {
		if (isSuccess && session) {
			setActiveRound(session.data.current_lap)
			setSecondsLeft(
				(isBreakTime
					? session.data.total_rest_seconds
					: session.data.total_work_seconds) * 60
			)
			for (var i = 0; i < rounds.length; ++i) {
				if (i < session.data.current_lap) {
					rounds[i].is_completed = true
					rounds[i].is_work = true
				}
			}
			setRounds(rounds)
		}
	}, [isSuccess, session])

	return { session, isLoading, work_interval }
}
