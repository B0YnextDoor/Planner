'use client'

import { Pause, Play, RefreshCcw } from 'lucide-react'

import { Button } from '../ui/buttons/Button'
import { Loader } from '../ui/loader/Loader'

import { useCreateSession } from './hooks/useCreateSession'
import { useCurrentSession } from './hooks/useCurrentSession'
import { useTimer } from './hooks/useTimer'
import { useUpdateSession } from './hooks/useUpdateSession'
import { Rounds } from './rounds/Round'
import { formatTime } from './utils/formatTime'

export const Timer = () => {
	const timerState = useTimer()
	const { isLoading, session, work_interval } = useCurrentSession(timerState)

	// const actions = useTimerActions({ ...timerState, rounds })

	const { mutate, isPending } = useCreateSession()
	const { mutateUpd, isUpdPending } = useUpdateSession(() =>
		timerState.setSecondsLeft(work_interval * 60)
	)

	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : session?.data ? (
				<>
					<Rounds
						rounds={timerState.rounds}
						nextRoundHandler={() => {}}
						prevRoundHandler={() => {}}
						activeRound={timerState.activeRound}
					/>
					{/* <button
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
						// onClick={
						// 	timerState.isRunning ? actions.pauseHandler : actions.playHandler
						// }
						// disabled={actions.isUpdateRoundPending}
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button> */}
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							mutateUpd()
						}}
						className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
						disabled={isUpdPending}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Create session
				</Button>
			)}
		</div>
	)
}
