import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext)

  const [minL, minR] = String(minutes).padStart(2, '0').split('');
  const [segL, segR] = String(seconds).padStart(2, '0').split('');

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