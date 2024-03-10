import { KanbanSquare, LayoutDashboard, Settings, Timer } from 'lucide-react'

import { IMenuItem } from '@/types/sidebar/menu_item.type'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard',
		is_pro: false
	},
	// {
	// 	icon: KanbanSquare,
	// 	link: DASHBOARD_PAGES.TASKS,
	// 	name: 'Tasks'
	// },
	{
		icon: Timer,
		link: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro',
		is_pro: false
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings',
		is_pro: false
	}
]
