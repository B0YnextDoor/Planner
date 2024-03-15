import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { ITimerRounds } from '@/types/timer/timer.types'

import styles from './Rounds.module.css'

export function Rounds({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound
}: ITimerRounds) {
	const isCanPrevRound = activeRound != 0
	const isCanNextRound = activeRound != rounds.length - 1
	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
			>
				<ChevronLeft size={35} />
			</button>
			<div className={styles.roundsContainer}>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(
								{
									[styles.completed]: round.is_completed,
									[styles.active]:
										index == activeRound && round.is_active && round.is_work,
									[styles.work]: !round.is_work && round.is_active
								},
								styles.round
							)}
						/>
					))}
			</div>
			<button
				className={styles.button}
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
			>
				<ChevronRight size={35} />
			</button>
		</div>
	)
}
