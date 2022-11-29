import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'

import { API } from 'aws-amplify'
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { listPodcasts } from '../src/graphql/queries'

import { Amplify } from 'aws-amplify'
import config from '../src/aws-exports'
Amplify.configure(config)

const Home = ({ signOut }) => {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    fetchPodcasts()
  }, [])

  async function fetchPodcasts() {
    const apiData = await API.graphql({ query: listPodcasts })
    const podcastsFromAPI = apiData.data.listPodcasts.items
    setPodcasts(podcastsFromAPI)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Podcasts</title>
        <meta
          name="description"
          content="Find and listen to your favorite, or new, podcasts!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <h1 className={styles.title}>Podcasts</h1>
      </nav>
      <main className={styles.main}>
        {podcasts.map((item) => (
          <p className={styles.description} key={item.id}>
            <Link href={`/shows/${item.urlString}`}>{item.title}</Link>
          </p>
        ))}
      </main>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default withAuthenticator(Home)
