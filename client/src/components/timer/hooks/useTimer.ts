import { useEffect, useState } from 'react'

import { IRound, ITimerState } from '@/types/timer/timer.types'

import { useTimerSettings } from './useTimerSettings'

export function useTimer(): ITimerState {
	const settings = useTimerSettings()

	const [rounds, setRounds] = useState<IRound[]>(
		new Array(settings.laps_ammount).fill({
			is_work: true,
			is_active: false,
			is_completed: false
		})
	)
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [isBreakTime, setIsBreakTime] = useState<boolean>(false)

	const [secondsLeft, setSecondsLeft] = useState<number>(
		settings.work_interval * 60
	)
	const [activeRound, setActiveRound] = useState<number>(0)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1)
			}, 1000)
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft, activeRound])

	useEffect(() => {
		if (secondsLeft > 0) return
		setIsBreakTime(!isBreakTime)
		setSecondsLeft(
			(isBreakTime ? settings.rest_interval : settings.work_interval) * 60
		)
	}, [secondsLeft, isBreakTime, settings.work_interval, settings.rest_interval])

	return {
		rounds,
		isRunning,
		secondsLeft,
		activeRound,
		isBreakTime,
		setIsRunning,
		setSecondsLeft,
		setActiveRound,
		setRounds
	}
}
