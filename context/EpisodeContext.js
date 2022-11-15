import React, { useState } from 'react'
export const EpContext = React.createContext()
const EpisodeContext = ({ subPages }) => {
  const [episodes, setEpisodes] = useState({})
  return (
    <EpContext.Provider value={[episodes, setEpisodes]}>
      {subPages}
    </EpContext.Provider>
  )
}
export default EpisodeContext
