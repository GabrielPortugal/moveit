import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompleteChallenges.module.css'

export function CompleteChallenges() {
  const { completedChallenges } = useContext(ChallengesContext)

  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios completos</span>
      <span>{completedChallenges}</span>
    </div>
  )
}