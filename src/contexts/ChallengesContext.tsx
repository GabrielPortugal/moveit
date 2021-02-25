import { createContext, ReactNode, useState } from 'react';
import challengesList from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: String
  amount: number
}

interface ChallengesContextData {
  level: number
  currentXp: number
  completedChallenges: number
  experienceToNextLevel: number
  activeChallenge: Challenge
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
}

// Usado para pegar as "datas" de forma global
export const ChallengesContext = createContext({} as ChallengesContextData)

// Componente que está no _app.tsx
export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentXp, setCurrentXp] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const rdn = Math.floor(Math.random() * challengesList.length)
    const challenge = challengesList[rdn]
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  const obj = {
    level,
    currentXp,
    completedChallenges,
    levelUp,
    startNewChallenge,
    activeChallenge,
    resetChallenge,
    experienceToNextLevel
  }

  return (
    <ChallengesContext.Provider value={obj}>
      {children}
    </ChallengesContext.Provider>
  )
}

