export interface ITimerSettings {
	work_interval: number
	rest_interval: number
	laps_ammount: number
}

export interface IUserSettings extends ITimerSettings {
	name: string
	email: string
	password: string | null
}
