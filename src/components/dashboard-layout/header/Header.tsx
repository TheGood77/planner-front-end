'use client'

import { useProfile } from '@/hooks/useProfile'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './Header.module.css'

export function Header() {
    const { data, isLoading } = useProfile()

    return (
        <header>
            <div className={styles.headerContainer}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <div className={styles.userInfo}>
                        <div className={styles.userInfoText}>
                            <p className={styles.userName}>{data?.user.name}</p>
                            <p className={styles.userEmail}>{data?.user.email}</p>
                        </div>

                        <div className={styles.userInitial}>
                            {data?.user.name?.charAt(0) || 'A'}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
