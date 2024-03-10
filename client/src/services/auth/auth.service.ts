import { ISignInForm, ISignUpForm } from '@/types/auth/auth.types'
import { IResponse } from '@/types/response/response.type'

import { authApi } from '@/api/interceptors'

export const authService = {
	AUTH_URL: '/auth/sign-',
	async auth(type: string, data: ISignUpForm | ISignInForm) {
		return await authApi.post<IResponse>(`${this.AUTH_URL}${type}`, data)
	},

	async logout() {
		return await authApi.post(`${this.AUTH_URL}out`)
	}
}
