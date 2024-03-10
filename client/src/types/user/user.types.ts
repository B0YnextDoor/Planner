export interface IUserBase {
	name: string
	email: string
}

export interface IUserProfile extends IUserBase {
	is_pro: boolean
	organisation_role: string
}

export interface IUpdUserProfile extends IUserBase {
	password: string
}
