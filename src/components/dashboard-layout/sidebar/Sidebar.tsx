'use client'

import Link from 'next/link'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import styles from './Sidebar.module.css'

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div>
				<Link
					href='/'
					className={styles.linkContainer}
				>
					<span className={styles.title}>
						Task App
					</span>
				</Link>
				<div className={styles.contentContainer}>
					<LogoutButton />
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
		</aside>
	)
}
