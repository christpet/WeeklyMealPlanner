import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import RecipesList from './recipesList'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weekly Meal Planner App</title>
        <meta name="description" content="An app to make meal plans for the week" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the meal planner app!
        </h1>

        <RecipesList/>

      </main>

      <footer className={styles.footer}>
        <a
          href="/__repl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built on
          <span className={styles.logo}>
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          </span>
          Replit
        </a>
      </footer>
    </div>
  )
}

export default Home
