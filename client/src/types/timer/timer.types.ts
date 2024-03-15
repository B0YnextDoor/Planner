import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export interface IRoundInfo {
	current_lap: number
	total_work_seconds: number
	total_rest_seconds: number
}

export interface IRound {
	is_completed: boolean
	is_active: boolean
	is_work: boolean
}

export interface ITimerRounds {
	rounds: IRound[]
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	activeRound: number
}

export interface ITimerState {
	rounds: IRound[]

	isRunning: boolean
	secondsLeft: number
	activeRound: number
	isBreakTime: boolean

	setIsBreakTime: Dispatch<SetStateAction<boolean>>
	setIsRunning: Dispatch<SetStateAction<boolean>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
	setActiveRound: Dispatch<SetStateAction<number>>
	setRounds: Dispatch<SetStateAction<IRound[]>>
}

export interface IActionType extends ITimerState {
	session: AxiosResponse<IRoundInfo, any> | undefined
}
