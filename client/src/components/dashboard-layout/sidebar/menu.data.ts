import {
	ClipboardList,
	KanbanSquare,
	LayoutDashboard,
	ListTodo,
	Settings,
	Timer
} from 'lucide-react'

import { IMenuItem } from '@/types/sidebar/menu_item.type'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard',
		is_pro: false
	},
	{
		icon: KanbanSquare,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks',
		is_pro: false
	},
	{
		icon: ClipboardList,
		link: DASHBOARD_PAGES.GROUPS,
		name: 'Task Groups',
		is_pro: false
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro',
		is_pro: false
	},
	{
		icon: ListTodo,
		link: DASHBOARD_PAGES.HABITS,
		name: 'Routine',
		is_pro: true
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings',
		is_pro: false
	}
]
