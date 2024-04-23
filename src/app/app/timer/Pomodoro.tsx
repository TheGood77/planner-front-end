'use client'

import { CircularProgress, Button } from '@mui/material'
import { Pause, PlayArrow, Sync } from '@mui/icons-material'
import { formatTime } from './format-time'
import { useCreateSession } from './hooks/useCreateSession'
import { useDeleteSession } from './hooks/useDeleteSession'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'
import { PomodoroRounds } from './rounds/PomodoroRounds'
import { useEffect } from 'react'
import { toast } from 'sonner'
import styles from './Pomodoro.module.css'

export function Pomodoro() {
    const timerState = useTimer()
    const { isLoading, sessionsResponse, workInterval } =
        useTodaySession(timerState)

    const rounds = sessionsResponse?.data.rounds
    const actions = useTimerActions({ ...timerState, rounds })

    const { isPending, mutate } = useCreateSession()
    const { deleteSession, isDeletePending } = useDeleteSession(() =>
        timerState.setSecondsLeft(workInterval * 60)
    )

    const handleNextRound = () => {
        if (timerState.isBreakTime) {
            actions.nextRoundHandler()
            toast.info("Go to work!")
        }
        else toast.info("Go to break!")
    }

    useEffect(() => {
        if (timerState.secondsLeft === 0) {
            handleNextRound()
        }
    }, [timerState.secondsLeft])

    return (
        <div className={styles.pomodoroContainer}>
            {!isLoading && (
                <div className={styles.timerDisplay}>
                    {formatTime(timerState.secondsLeft)}
                </div>
            )}
            {isLoading ? (
                <CircularProgress />
            ) : sessionsResponse?.data ? (
                <>
                    <PomodoroRounds
                        rounds={rounds}
                        nextRoundHandler={actions.nextRoundHandler}
                        prevRoundHandler={actions.prevRoundHandler}
                        activeRound={timerState.activeRound}
                    />
                    <button
                        className={styles.PauseButton}
                        onClick={
                            timerState.isRunning ? actions.pauseHandler : actions.playHandler
                        }
                        disabled={actions.isUpdateRoundPending}
                    >
                        {timerState.isRunning ? <Pause /> : <PlayArrow />}
                    </button>
                    <button
                        onClick={() => {
                            timerState.setIsRunning(false)
                            deleteSession(sessionsResponse.data.id)
                        }}
                        className={styles.SyncButton}
                        disabled={isDeletePending}
                    >
                        <Sync />
                    </button>
                </>
            ) : (
                <Button
                    onClick={() => mutate()}
                    disabled={isPending}
                >
                    Create session
                </Button>
            )}
        </div>
    )
}
