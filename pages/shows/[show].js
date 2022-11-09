import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import Image from 'next/image'
import path from 'path';
import fs from 'fs/promises';
import convert from "xml-js"

const getShowData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'podcasts.json');
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData.toString());
  return data;
}

const fetchFeed = async (url) => {
  const xmlFeed = await fetch(url).then(response => response.text())
  let feed = convert.xml2js(xmlFeed, {compact: true, spaces: 4})
  return feed
}

export default function Show({ ...props }) {
  const {showData} = props
  const [dataFeed, setDataFeed] = useState()

  useEffect(() => {
    fetchFeed(showData.feed).then(item => setDataFeed(item.rss.channel))
  },[])

  const router = useRouter();
  if (props.hasError) {
    return <h1>Error - please try another parameter</h1>
  }

  if (router.isFallback) {
      return <h1>Loading...</h1>
  }

  if (dataFeed) {
    return (
      <Layout>
        <div>
          <h1>{showData.title}</h1>
          <Image alt={showData.title} src={dataFeed?.image.url[Object.keys(dataFeed?.image.url)[0]]} height={50} width={50} />
          <p>{dataFeed?.description[Object.keys(dataFeed?.description)[0]]}</p>
          <div>
            <h2>Episodes</h2>
            <ul>
            {dataFeed?.item.map((item,index) => (
              <li key={index}>{item.title._text}</li>
            ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  } else {
    return <Layout><h1>{showData.title}</h1></Layout>;
  }

}

export const getStaticPaths = async () => {
  const data = await getShowData();
  const pathsWithParams = data.podcasts.map((item) => ({ params: { show: item.id }}))

  return {
      paths: pathsWithParams,
      fallback: true
  }
}

export const getStaticProps = async (context) => {
  const itemID = context.params?.show;
  const data = await getShowData();
  const foundItem = data.podcasts.find((show) => itemID === show.id);

  if (!foundItem) {
    return {
      props: { hasError: true },
    }
}

return {
  props: {
    showData: foundItem
  }
}
}