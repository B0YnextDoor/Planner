'use client'

import { ArrowRightLeft, Pause, Play, RefreshCcw } from 'lucide-react'

import { Button } from '../ui/buttons/Button'
import { Loader } from '../ui/loader/Loader'

import styles from './Timer.module.css'
import { useCreateSession } from './hooks/useCreateSession'
import { useCurrentSession } from './hooks/useCurrentSession'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useUpdateSession } from './hooks/useUpdateSession'
import { Rounds } from './rounds/Rounds'
import { formatTime } from './utils/formatTime'

export const Timer = () => {
	const timerState = useTimer()
	const { isLoading, session, work_interval, isActive } =
		useCurrentSession(timerState)

	const actions = useTimerActions({ ...timerState, session })

	const { mutate, isPending } = useCreateSession()
	const { mutateUpd, isUpdPending } = useUpdateSession(() => {
		timerState.setSecondsLeft(work_interval * 60)
		timerState.setRounds(
			new Array(timerState.rounds.length).fill({
				is_work: true,
				is_active: false,
				is_completed: false
			})
		)
	})

	return (
		<div className='flex flex-col items-center justify-center h-[65vh]'>
			{isActive && (
				<div className='inline-block font-mono text-3xl overflow-hidden text-nowrap'>
					<span className={styles.text}>
						{!timerState.isRunning
							? 'Waiting....'
							: timerState.isBreakTime
								? 'Nice work!.'
								: 'Working....'}
					</span>
				</div>
			)}
			<div className='relative w-[500px] text-center'>
				{!isLoading && (
					<div className='text-9xl font-semibold'>
						{formatTime(timerState.secondsLeft)}
					</div>
				)}
				{isLoading ? (
					<Loader />
				) : session?.data && isActive ? (
					<>
						<button
							className='absolute top-0 left-0 opacity-40 hover:opacity-90 transition-opacity'
							disabled={actions.isUpdateRoundPending}
							onClick={actions.switchModeHandler}
						>
							<ArrowRightLeft size={30} />
						</button>
						<Rounds
							rounds={timerState.rounds}
							nextRoundHandler={actions.nextRoundHandler}
							prevRoundHandler={actions.prevRoundHandler}
							activeRound={timerState.activeRound}
						/>
						<button
							className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
							onClick={
								timerState.isRunning
									? actions.pauseHandler
									: actions.playHandler
							}
							disabled={actions.isUpdateRoundPending}
						>
							{timerState.isRunning ? <Pause size={50} /> : <Play size={50} />}
						</button>
						<button
							onClick={() => {
								timerState.setIsRunning(false)
								mutateUpd()
							}}
							className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
							disabled={isUpdPending}
						>
							<RefreshCcw size={30} />
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
		</div>
	)
}
