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

export interface IRoutineTemplate {
	template_id: number
	name: string
	time: number
}

export interface ICreateTemplate
	extends Omit<IRoutineTemplate, 'template_id' | 'name'> {
	habits: number[]
}

export type IUpdateTemplate = Omit<IRoutineTemplate, 'time'>

export interface IUpdateTemplateHabits extends Omit<IUpdateTemplate, 'name'> {
	habits: number[]
	time: number
}

export type IUpdateTemplateForm = Partial<Omit<IUpdateTemplate, 'template_id'>>

export type TypeHabitForm = Partial<IHabit>
