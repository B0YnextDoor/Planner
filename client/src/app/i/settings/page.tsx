import { Metadata } from 'next'

import { Heading } from '@/components/ui/heading/Heading'
import { UserSettings } from '@/components/user-settings/UserSettings'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div>
			<Heading title='Settings' />
			<UserSettings />
		</div>
	)
}
