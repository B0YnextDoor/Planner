import Link from 'next/link'

import { IMenuItem } from '@/types/sidebar/menu_item.type'

import { useProfile } from '@/hooks/useProfile'

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	const { data } = useProfile()
	return (
		<div className={item.is_pro && !data?.is_pro ? 'hidden' : ''}>
			<Link
				href={item.link}
				className='flex gap-2.5 items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg'
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
