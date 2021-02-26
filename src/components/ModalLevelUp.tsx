import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ModalLevelUp.module.css'

export function ModalLevelUp() {
  const { level, closeModalLevelUp } = useContext(ChallengesContext)
  return (
    <div className={styles.overlay}>
      <div className={styles.modalLevelUpContainer}>
        <header>{level}</header>

        <strong>Parabéns 👏</strong>
        <p>Você alcançou um novo level!</p>

        <button type="button" onClick={closeModalLevelUp}>
          <img src="/icons/close.svg"></img>
        </button>
      </div>
    </div>
  );
}