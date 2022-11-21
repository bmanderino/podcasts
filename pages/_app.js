import { useState, useMemo } from 'react'
import EpisodeContext from '../context/EpisodeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [episodes, setEpisodes] = useState([])
  const provided = useMemo(
    () => ({
      value: episodes,
      setValue: (value) => setEpisodes(value),
    }),
    [episodes]
  )
  return (
    <EpisodeContext.Provider value={provided}>
      <Component {...pageProps} />
    </EpisodeContext.Provider>
  )
}

export default MyApp
