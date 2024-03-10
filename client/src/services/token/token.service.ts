import Cookies from 'js-cookie'

import { authApi } from '@/api/interceptors'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'access_token',
	'REFRESH_TOKEN' = 'refresh_token'
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}

export const getNewTokens = async () => {
	return await authApi.post('http://localhost:8000/user/refresh')
}
