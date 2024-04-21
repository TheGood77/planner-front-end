import { useProfile } from '@/hooks/useProfile'

export function useLoadSettings() {
	const { data } = useProfile()

	const workInterval = data?.user.workInterval ?? 25
	const breakInterval = data?.user.breakInterval ?? 5

	return { workInterval, breakInterval }
}
