import axios, { type CreateAxiosDefaults } from 'axios'

import { getNewTokens, removeFromStorage } from '@/services/token/token.service'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:8000',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const authApi = axios.create(options)

export const userApi = axios.create(options)

userApi.interceptors.response.use(
	response => response,
	async error => {
		const origRequest = error.config
		if (error?.response?.status == 401) removeFromStorage()
		else if (
			error?.response?.status == 404 &&
			error.config &&
			!error.config._isRetry
		) {
			origRequest._isRetry = true
			try {
				await getNewTokens()
				return userApi.request(origRequest)
			} catch (error: any) {
				if (error?.response?.status == 401) removeFromStorage()
			}
		}
		throw error
	}
)
