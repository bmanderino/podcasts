import { useContext } from 'react'
import EpisodeContext from '../../../../context/EpisodeContext'
import Layout from '../../../../components/layout'

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
  // let episodes = useContext(EpisodeContext)
  // const pathsWithParams = episodes.value.map((pod) => ({
  //   params: {
  //     episodes: pod.path,
  //   },
  // }))
  // return {
  //   paths: pathsWithParams,
  //   fallback: true,
  // }
}

export const getStaticProps = async (context) => {
  // const episode = context.params?.episode
  // let episodes = useContext(EpisodeContext)
  // const thisPodcast = episodes.find((item) => (item.path = episode))
  // if (!foundItem) {
  //   return {
  //     props: { hasError: true },
  //   }
  // }
  // return {
  //   props: {
  //     showData: thisPodcast,
  //   },
  // }
}
