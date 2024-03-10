import { Metadata } from 'next'

import { Timer } from '@/components/timer/Timer'
import { Heading } from '@/components/ui/heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Pomodoro',
	...NO_INDEX_PAGE
}

export default function TimerPage() {
	return (
		<div>
			<Heading title='Timer' />
			<Timer />
		</div>
	)
}
