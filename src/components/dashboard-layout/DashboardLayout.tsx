import { PropsWithChildren } from 'react'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'
import styles from './DashboardLayout.module.css'

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

      <main className={styles.mainContent}>
        <Header />
        {children}
      </main>
    </div>
  )
}
