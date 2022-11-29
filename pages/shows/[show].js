import { useState, useEffect, useContext } from 'react'
import EpisodeContext from '../../context/EpisodeContext'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import path from 'path'
import fs from 'fs/promises'
import convert from 'xml-js'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

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

export default function Show({ ...props }) {
  let episodes = useContext(EpisodeContext)
  const router = useRouter()
  const { showData } = props
  const [dataFeed, setDataFeed] = useState()
  const [episodeFeed, setEpisodeFeed] = useState([])

  useEffect(() => {
    if (showData)
      fetchFeed(showData.feed).then((item) => setDataFeed(item.rss.channel))
  }, [])

  useEffect(() => {
    const rows = []
    if (dataFeed) {
      for (let [index, obj] of dataFeed?.item.entries()) {
        let data = {
          id: index,
          title: obj.title._text,
          path: obj.title._text.toLowerCase().split(' ').join('-'),
          desc: obj.description._cdata,
          audio: obj.enclosure._attributes.url,
        }
        rows.push(data)
      }
    }
    setEpisodeFeed(rows)
    episodes.setValue(rows)
  }, [dataFeed])

  const handleRowClick = (param) => {
    let page = param.row.path
    // router.push(`${router.asPath}/episodes/${page}`)
  }

  if (props.hasError) {
    return <h1>Error - please try another parameter</h1>
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  if (dataFeed) {
    const columns = [{ field: 'title', headerName: 'Episodes', flex: 1 }]

    return (
      <Layout>
        <main>
          <h1>{showData.title}</h1>
          <section className="details">
            <Image
              alt={showData.title}
              src={dataFeed?.image.url[Object.keys(dataFeed?.image.url)[0]]}
              height={125}
              width={125}
            />
            <p>
              {dataFeed?.description[Object.keys(dataFeed?.description)[0]]}
            </p>
          </section>
          <section className="episodes">
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                className="episodeGrid"
                rows={episodeFeed}
                columns={columns}
                onRowClick={handleRowClick}
              />
            </Box>
          </section>
        </main>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <h1>{showData.title}</h1>
      </Layout>
    )
  }
}

export const getStaticPaths = async () => {
  const data = await getShowData()
  const pathsWithParams = data.Podcasts.map((item) => ({
    params: { show: item.id },
  }))

  return {
    paths: pathsWithParams,
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const itemID = context.params?.show
  const data = await getShowData()
  const foundItem = data.Podcasts.find((show) => itemID === show.id)

  if (!foundItem) {
    return {
      props: { hasError: true },
    }
  }

  return {
    props: {
      showData: foundItem,
    },
  }
}
