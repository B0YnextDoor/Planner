import {
	IOrganisationBase,
	IOrganisationMember,
	TypeOrganisationForm
} from '@/types/organisation/organisation.types'
import { IResponse } from '@/types/response/response.type'
import { TypeUserForm } from '@/types/user/user.types'

import { userApi } from '@/api/interceptors'

export const organisationService = {
	ORGANISATION_URL: '/organisation/',

	async getUserOrganisation() {
		const response = await userApi.get<IOrganisationBase>(
			`${this.ORGANISATION_URL}get-by-user`
		)
		if (response.status == 200) return response
		return undefined
	},

	async createOrganisation(data: TypeOrganisationForm) {
		return await userApi.post<IResponse>(`${this.ORGANISATION_URL}create`, data)
	},

	async updateOrganisation(data: TypeOrganisationForm) {
		return await userApi.put<IResponse>(
			`${this.ORGANISATION_URL}upd-settings`,
			data
		)
	},

	async deleteOrganisation() {
		return await userApi.delete<IResponse>(
			`${this.ORGANISATION_URL}delete-by-id`
		)
	},

	async joinOrganisation(invite_code: string) {
		return await userApi.post<IResponse>(`${this.ORGANISATION_URL}join`, {
			invite_code: invite_code
		})
	},

	async inviteUser(data: TypeUserForm) {
		return await userApi.post<IResponse>(
			`${this.ORGANISATION_URL}invite-user`,
			data
		)
	},

	async deleteUser(id: number) {
		return await userApi.post<IResponse>(
			`${this.ORGANISATION_URL}delete-member`,
			{
				member_id: id
			}
		)
	},

	async leaveOrganisation() {
		return await userApi.post<IResponse>(`${this.ORGANISATION_URL}leave`)
	},

	async getOrganisationMembers() {
		return await userApi.get<IOrganisationMember[]>(
			`${this.ORGANISATION_URL}members`
		)
	}
}
