import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentXp, experienceToNextLevel } = useContext(ChallengesContext)

  const pnl = Math.round(currentXp * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${pnl}%` }} />

        <span className={styles.currentXp} style={{ left: `${pnl}%` }}
        >{currentXp} xp</span>

      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}