export interface IOrganisationStatistics {
	ammount_of_tasks: number
	finished_tasks: number
}

export interface IUserStatistics extends IOrganisationStatistics {
	overdued_tasks: number
}
