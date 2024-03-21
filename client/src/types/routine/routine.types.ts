export interface IBuyPro {
	pro_code: string
}

export interface IHabit {
	id: number
	name: string
	duration: number
	color: string
}

export interface IRoutine {
	habits: IHabit[]
	time: number
}

export type TypeHabitForm = Partial<IHabit>
