'use client'

import { Achievements } from './achievements/Achievements'
import { UserStatistics } from './userstats/UserStatistics'

export const Statistics = () => {
	return (
		<div className='grid grid-cols-[50%_50%]'>
			<UserStatistics />
			<Achievements />
		</div>
	)
}
