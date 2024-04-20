'use client'

import { useMutation } from '@tanstack/react-query'
import { Logout } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<div className='absolute top-1 right-1'>
			<button
				className='opacity-20 hover:opacity-100 transition-opacity duration-300'
				onClick={() => mutate()}
			>
				<Logout />
			</button>
		</div>
	)
}
