import { AssignmentTurnedIn, Timer, Settings } from '@mui/icons-material';

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: AssignmentTurnedIn,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks'
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro'
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings'
	}
]
