import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { ISignInForm, ISignUpForm } from '@/types/auth/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import './Auth.css'
import { SignIn } from './auth-widgets/SignIn'
import { SignUp } from './auth-widgets/SignUp'
import { ToggleContainer } from './auth-widgets/ToggleContainer'
import { achievementService } from '@/services/achievement/achievement.service'
import { authService } from '@/services/auth/auth.service'

export const Auth = () => {
	const ref = useRef(null)
	const [toggle, setToggle] = useState<any>()
	const [login, setLogin] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)
	const { push } = useRouter()
	useEffect(() => {
		setToggle(ref.current)
	}, [])
	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: ISignInForm | ISignUpForm) =>
			authService.auth(login ? 'in' : 'up', data),
		onSuccess() {
			toast.success('Successfully login!')
			achievementService.load()
			push(DASHBOARD_PAGES.HOME)
		},
		onError(error: any) {
			setIsError(true)
			toast.error(error?.response?.data?.detail)
		}
	})
	const handleError = (e: any) => {
		e.preventDefault()
		setIsError(false)
	}
	return (
		<div
			className='container'
			id='container'
			ref={ref}
		>
			<SignUp
				className='sign-up'
				mutate={mutate}
				setLogin={setLogin}
				isError={isError}
				handleError={handleError}
			/>
			<SignIn
				className='sing-in'
				mutate={mutate}
				setLogin={setLogin}
				isError={isError}
				handleError={handleError}
			/>
			<ToggleContainer
				className='toggle'
				toggle={toggle}
			/>
		</div>
	)
}
