import Head from 'next/head';
import { GetServerSideProps } from 'next'

import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from "../styles/pages/App.module.css"

interface HomeProps {
  level: number
  currentXp: number
  completedChallenges: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentXp={props.currentXp}
      completedChallenges={props.completedChallenges}
    >
      <div className={styles.app}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar></ExperienceBar>

        <CountdownProvider>
          <section>
            <div>
              <Profile></Profile>
              <CompleteChallenges></CompleteChallenges>
              <Countdown></Countdown>
            </div>
            <div>
              <ChallengeBox></ChallengeBox>
            </div>
          </section>
        </CountdownProvider>

      </div>
    </ChallengesProvider>
  )
}

// é chamado antes de exibir a tela
// é chamado no servidor NODE e nao dentro do browser
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentXp, completedChallenges } = ctx.req.cookies

  let le = level ? level : 1
  let cu = currentXp ? currentXp : 0
  let co = completedChallenges ? completedChallenges : 0

  return {
    props: {
      level: Number(le),
      currentXp: Number(cu),
      completedChallenges: Number(co)
    }
  }
}
