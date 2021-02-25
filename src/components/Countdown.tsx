import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Farei tal função quando [active OU time] mudar
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minL, minR] = String(minutes).padStart(2, '0').split('');
  const [segL, segR] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  function btnActive() {
    return (
      <button type="button"
        className={`${styles.countdownBtn} ${styles.countdownBtnActive}`}
        onClick={resetCountdown}
      >
        Abandonar ciclo
      </button>
    )
  }

  function btnNoActive() {
    return (
      <button type="button"
        className={styles.countdownBtn}
        onClick={startCountdown}
      >
        Iniciar ciclo
      </button>
    )
  }

  function finishedCycle() {
    return (
      <button
        disabled
        className={styles.countdownBtn}
      >
        Ciclo encerrado
      </button>
    )
  }

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minL}</span>
          <span>{minR}</span>
        </div>
        <span>:</span>
        <div>
          <span>{segL}</span>
          <span>{segR}</span>
        </div>
      </div>

      {hasFinished ? finishedCycle() : isActive ? btnActive() : btnNoActive()}
    </>
  )
}