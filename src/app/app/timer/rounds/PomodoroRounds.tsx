import { ChevronLeft, ChevronRight } from '@mui/icons-material'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import styles from './PomodoroRounds.module.css'

interface IPomodoroRounds {
    rounds: IPomodoroRoundResponse[] | undefined
    nextRoundHandler: () => void
    prevRoundHandler: () => void
    activeRound: IPomodoroRoundResponse | undefined
}

export function PomodoroRounds({ rounds, nextRoundHandler, prevRoundHandler, activeRound }: IPomodoroRounds) {
    const isCanPrevRound = rounds
        ? rounds.some(round => round.isCompleted)
        : false
    const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                disabled={!isCanPrevRound}
                onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
            >
                <ChevronLeft />
            </button>
            <div className={styles.roundsContainer}>
                {rounds &&
                    rounds.map((round, index) => (
                        <div
                            key={index}
                            className={
                                `${styles.round} 
								${round.isCompleted ? styles.completed : ''} 
								${round.id === activeRound?.id && !round.isCompleted ? styles.active : ''}`
                            }
                        />
                    ))}
            </div>
            <button
                className={styles.button}
                disabled={!isCanNextRound}
                onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
            >
                <ChevronRight />
            </button>
        </div>
    )
}
