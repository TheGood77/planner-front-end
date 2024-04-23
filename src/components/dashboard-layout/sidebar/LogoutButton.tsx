'use client'

import { useMutation } from '@tanstack/react-query'
import { Logout } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'
import styles from './Sidebar.module.css'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<div className={styles.logoutButtonContainer}>
			<button
				className={styles.logoutButton}
				onClick={() => mutate()}
			>
				<Logout />
			</button>
		</div>
	)
}
