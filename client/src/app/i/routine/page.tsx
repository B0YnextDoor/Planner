import { Metadata } from 'next'

import { Heading } from '@/components/ui/heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Daily Routine',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<Heading title='Daily Routine' />
		</div>
	)
}
