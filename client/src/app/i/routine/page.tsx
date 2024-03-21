import { Metadata } from 'next'

import { Routine } from '@/components/routine/Routine'
import { Heading } from '@/components/ui/heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Daily Routine',
	...NO_INDEX_PAGE
}

export default function RoutinePage() {
	return (
		<div>
			<Heading title='Daily Routine' />
			<Routine />
		</div>
	)
}
