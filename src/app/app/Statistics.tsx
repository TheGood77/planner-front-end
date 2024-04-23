'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { useProfile } from '@/hooks/useProfile'
import styles from './Statistics.module.css'

export function Statistics() {
	const { data, isLoading } = useProfile()
  
	return isLoading ? (
	  <CircularProgress />
	) : (
	  <div className={styles.statisticsContainer}>
		{data?.statistics.length ? (
		  data.statistics.map(statistic => (
			<div
			  className={styles.statisticCard}
			  key={statistic.label}
			>
			  <div className={styles.statisticLabel}>{statistic.label}</div>
			  <div className={styles.statisticValue}>{statistic.value}</div>
			</div>
		  ))
		) : (
		  <div>Statistics not loaded!</div>
		)}
	  </div>
	)
  }
  