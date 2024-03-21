import { IUserBase, IUserProfile } from '../user/user.types'

export interface IOrganisationBase {
	name: string
	description: string
}

export type TypeOrganisationForm = Partial<IOrganisationBase>

export interface IOrganisationPage {
	organisation: IOrganisationBase | undefined
	user: IUserProfile | undefined
}

export interface IOrganisationMember extends IUserBase {
	id: number
	role: string
}
