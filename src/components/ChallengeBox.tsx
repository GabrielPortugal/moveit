import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext)

  function challengeNotActive() {
    return (
      <div className={styles.challengeNotActive}>
        <strong>Finalize um cilco para receber um desafio</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up"></img>
          <span>Avance de level completando desafios.</span>
        </p>
      </div>
    )
  }

  function challengeActive() {
    return (
      <div className={styles.challengeActive}>
        <header>Ganhe {activeChallenge.amount} xp</header>
        <main>
          <img src={`icons/${activeChallenge.type}.svg`} alt=""></img>
          <strong>Novo desafio</strong>
          <p>{activeChallenge.description}</p>
        </main>
        <footer>
          <button type="button"
            className={styles.failedBtn}
            onClick={resetChallenge}
          >Falhei</button>
          <button type="button"
            className={styles.succededBtn}
          >Completei</button>
        </footer>
      </div>
    )
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? challengeActive() : challengeNotActive()}
    </div>
  )
}