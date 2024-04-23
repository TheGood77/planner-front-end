import type { CSSProperties, PropsWithChildren } from 'react'
import styles from './Badge.module.css';

interface IBadge {
  className?: string
  variant?: string
  style?: CSSProperties
}

export function Badge({ children, className, variant = 'gray', style }: PropsWithChildren<IBadge>) {
  const backgroundColorClass = styles[variant]

  return (
    <span
      className={`${styles.baseClass} ${backgroundColorClass} ${className || ''}`}
      style={style}
    >
      {children}
    </span>
  )
}
