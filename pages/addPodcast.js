import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
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
import {
  createPodcast as createPodcastMutation,
  deletePodcast as deletePodcastMutation,
} from '../src/graphql/mutations'

import { Amplify } from 'aws-amplify'
import config from '../src/aws-exports'
Amplify.configure(config)

const addPodcast = (props) => {
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
    event.target.reset()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Podcasts</title>
        <meta
          name="description"
          content="Find and listen to your favorite, or new, podcasts!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
      </main>
    </div>
  )
}
//addPodcast.propTypes = {};

export default withAuthenticator(addPodcast)
