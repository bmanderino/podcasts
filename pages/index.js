import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';


const PODCASTS = [
  {
    id: 'the-daily',
    title: 'The Daily',
    feed: 'https://feeds.simplecast.com/54nAGcIl'
  },
  {
    id: 'crime-junkie',
    title: 'Crime Junkie',
    feed: 'https://feeds.simplecast.com/qm_9xx0g'
  },
  {
    id: 'apology-line',
    title: 'The Apology Line',
    feed: 'https://rss.art19.com/apology-line'
  },
  {
    id: 'working-it-out',
    title: 'Mike Birbiglia\'s Working It Out',
    feed: 'https://workingitout.libsyn.com/rss'
  }
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Podcasts</title>
        <meta name="description" content="Find and listen to your favorite, or new, podcasts!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Podcasts
        </h1>

        {PODCASTS.map(item => (
          <p className={styles.description}>
          <Link href="/shows/show">{item.title}</Link>
        </p>
        ))}


        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
