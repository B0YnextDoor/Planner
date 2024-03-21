export interface ITaskBase {
	task_id: number
	category: string
	description: string | null
	priority: string | null
	isCompleted: boolean
}
