import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"

import styles from "../styles/components/Profile.module.css"

export function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/GabrielPortugal.png" alt="Gabriel Portugal"></img>
      <div>
        <strong>Gabriel Portugal</strong>
        <p>
          <img src="icons/level.svg" alt="Level"></img>
          <span>Level {level}</span>
        </p>
      </div>
    </div>
  )
}