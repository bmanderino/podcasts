import { useState, useEffect } from 'react'
import Layout from '../../../../components/layout'
import { useRouter } from 'next/router'
import path from 'path'
import fs from 'fs/promises'
import convert from 'xml-js'

const getShowData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'podcasts.json')
  const fileData = await fs.readFile(filePath)
  const data = JSON.parse(fileData.toString())
  return data
}

const fetchFeed = async (url) => {
  const xmlFeed = await fetch(url).then((response) => response.text())
  let feed = convert.xml2js(xmlFeed, { compact: true, spaces: 4 })
  return feed
}

export default function Episode({ ...props }) {
  const { showData } = props

  if (props.hasError) {
    return <h1>Error - please try another parameter</h1>
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return <Layout>hello world</Layout>
}

export const getStaticPaths = async () => {
  const data = await getShowData()
  // const router = useRouter()
  // const url = router.asPath.split('/')
  const thisPodcast = data.Podcasts.find((item) => (item.id = url[1]))
  const dataFeed = await fetchFeed(thisPodcast.feed)
  const pathsWithParams = dataFeed.rss.channel.item.map((pod) => ({
    params: {
      episodes: pod.title._text.toLowerCase().split(' ').join('-'),
    },
  }))

  return {
    paths: pathsWithParams,
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const episode = context.params?.episode
  const router = useRouter()
  const url = router.asPath.split('/')

  const data = await getShowData()
  const thisPodcast = data.Podcasts.find((item) => (item.id = url[1]))
  const dataFeed = await fetchFeed(thisPodcast.feed)
  let thisEpisode = dataFeed.rss.channel.item.map((pod) => ({
    title: pod.title._text,
    description: pod.description._text,
  }))

  if (!foundItem) {
    return {
      props: { hasError: true },
    }
  }

  return {
    props: {
      showData: thisEpisode,
    },
  }
}
