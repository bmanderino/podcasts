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
import {
  createPodcast as createPodcastMutation,
  deletePodcast as deletePodcastMutation,
} from '../src/graphql/mutations'
import EpisodeContext from '../context/EpisodeContext'

import Podcasts from '../data/podcasts.json'

import { Amplify } from 'aws-amplify'
import config from '../src/aws-exports'
Amplify.configure(config)

const Home = () => {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    fetchPodcasts()
  }, [])

  async function fetchPodcasts() {
    const apiData = await API.graphql({ query: listPodcasts })
    const podcastsFromAPI = apiData.data.listPodcasts.items
    setPodcasts(podcastsFromAPI)
  }

  async function createPodcast(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const data = {
      title: form.get('title'),
      feed: form.get('feed'),
      urlString: form.get('urlString'),
    }
    await API.graphql({
      query: createPodcastMutation,
      variables: { input: data },
    })
    fetchPodcasts()
    event.target.reset()
  }
  console.log('!!!!', podcasts)

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
        <form margin="3rem 0" onSubmit={createPodcast}>
          <input
            type="text"
            name="title"
            placeholder="Podcast Name"
            label="Podcast Name"
            labelHidden
            variation="quiet"
            required
          />
          <input
            type="text"
            name="feed"
            placeholder="Podcast Feed"
            label="Podcast Feed"
            labelHidden
            variation="quiet"
            required
          />
          <input
            type="text"
            name="urlString"
            placeholder="Podcast URL String"
            label="Podcast URL String"
            labelHidden
            variation="quiet"
            required
          />
          <button type="submit" variation="primary">
            Create Podcast
          </button>
        </form>
        {podcasts.map((item) => (
          <p className={styles.description} key={item.id}>
            <Link href={`/shows/${item.urlString}`}>{item.title}</Link>
          </p>
        ))}
      </main>
    </div>
  )
}

export default withAuthenticator(Home)
