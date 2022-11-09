import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

import {podcasts} from '../data/podcasts.json'

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

        {podcasts.map(item => (
          <p className={styles.description} key={item.id}>
          <Link href={`/shows/${item.id}`}>{item.title}</Link>
        </p>
        ))}
      </main>
    </div>
  )
}
