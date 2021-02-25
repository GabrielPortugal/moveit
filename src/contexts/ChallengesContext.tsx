import { createContext, ReactNode, useEffect, useState } from 'react';
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
  completeChallenge: () => void
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

  // array vazio executa quando dar um "mounted" na tela
  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const rdn = Math.floor(Math.random() * challengesList.length)
    const challenge = challengesList[rdn]

    setActiveChallenge(challenge)

    new Audio('./notification.mp3').play()

    if (Notification.permission === 'granted') {
      // https://developer.mozilla.org/pt-BR/docs/Web/API/notificacoes
      new Notification('Novo desadio 🎉', {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge
    let finalXp = currentXp + amount

    if (finalXp > experienceToNextLevel) {
      finalXp = finalXp - experienceToNextLevel
      levelUp()
    }

    setCurrentXp(finalXp)
    setActiveChallenge(null)
    setCompletedChallenges(completedChallenges + 1)
  }

  const obj = {
    level,
    currentXp,
    completedChallenges,
    levelUp,
    startNewChallenge,
    activeChallenge,
    resetChallenge,
    experienceToNextLevel,
    completeChallenge
  }

  return (
    <ChallengesContext.Provider value={obj}>
      {children}
    </ChallengesContext.Provider>
  )
}

