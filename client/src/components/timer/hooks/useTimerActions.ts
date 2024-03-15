import { IActionType } from '@/types/timer/timer.types'

import { useTimerSettings } from './useTimerSettings'
import { useUpdateRound } from './useUpdateRound'

export const useTimerActions = ({
	rounds,
	session,
	activeRound,
	secondsLeft,
	isBreakTime,
	isRunning,
	setRounds,
	setIsRunning,
	setActiveRound,
	setIsBreakTime
}: IActionType) => {
	const { work_interval, rest_interval } = useTimerSettings()
	const { updateRound, isUpdateRoundPending } = useUpdateRound(() =>
		isRunning ? playHandler() : {}
	)

	const playHandler = () => {
		rounds[activeRound] = {
			is_work: rounds[activeRound].is_work,
			is_active: true,
			is_completed: false
		}
		setRounds(rounds)
		setIsRunning(true)
	}

	const pauseHandler = () => {
		updateRound({
			current_lap: activeRound,
			total_work_seconds: !isBreakTime
				? secondsLeft
				: session
					? session.data.total_work_seconds
					: work_interval * 60,
			total_rest_seconds: isBreakTime
				? secondsLeft
				: session
					? session.data.total_rest_seconds
					: rest_interval * 60
		})
		setIsRunning(false)
	}

	const prevRoundHandler = () => {
		setIsBreakTime(false)
		rounds[activeRound] = rounds[activeRound - 1] = {
			is_work: true,
			is_active: false,
			is_completed: false
		}
		setRounds(rounds)
		setActiveRound(activeRound - 1)
		updateRound({
			current_lap: activeRound - 1,
			total_work_seconds: work_interval * 60,
			total_rest_seconds: rest_interval * 60
		})
	}

	const nextRoundHandler = () => {
		setIsBreakTime(false)
		setActiveRound(activeRound + 1)
		updateRound({
			current_lap: activeRound + 1,
			total_work_seconds: work_interval * 60,
			total_rest_seconds: rest_interval * 60
		})
	}

	const switchModeHandler = () => {
		setIsBreakTime(!isBreakTime)
		rounds[activeRound] = {
			is_work: isBreakTime,
			is_active: rounds[activeRound].is_active,
			is_completed: false
		}
		setRounds(rounds)
		updateRound({
			current_lap: activeRound,
			total_work_seconds: !isBreakTime
				? secondsLeft
				: session
					? session.data.total_work_seconds
					: work_interval * 60,
			total_rest_seconds: isBreakTime
				? secondsLeft
				: session
					? session.data.total_rest_seconds
					: rest_interval * 60
		})
	}

	return {
		isUpdateRoundPending,
		pauseHandler,
		playHandler,
		nextRoundHandler,
		prevRoundHandler,
		switchModeHandler
	}
}
