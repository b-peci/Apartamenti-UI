/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import postsThumbnailData from '../../models/postsThumbnailData'
import { fetchData, fetchDataWithConfig } from 'src/@core/utils/axios'
import Filters from 'src/components/Filters'
import Posts from 'src/components/Posts'

const Home = () => {
  const [showNoRoomsInput, setShowNumberRoomsInput] = useState(true)
  const [posts, setPosts] = useState<postsThumbnailData[]>([])
  const [countries, setCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchDataWithConfig('Posts/GetPostsThumbnail/1', { withCredentials: true })
      .then(res => {
        setPosts(res.data.posts)

      })
      .catch(err => {
        setErrorMessage('Could not get posts')
      })
  }, [])

  return (
    <Grid>
      <Filters showNoRoomsInput={showNoRoomsInput} countries={countries} />
      <Grid container spacing={2}>
        {errorMessage === '' && <Posts posts={posts} />}
        {errorMessage !== '' && errorMessage}
      </Grid>
    </Grid>
  )
}

export default Home
