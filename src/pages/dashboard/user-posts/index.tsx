import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'
import { fetchDataWithConfig } from 'src/@core/utils/axios'
import ApexLineChart from 'src/components/charts/ApexLineChart'
import userPostsNo from 'src/models/userPostsNo'
import List from 'src/components/List'
import { toast } from 'react-hot-toast'
const UserPosts = () => {
  const { settings, saveSettings } = useSettings()
  const [noPosts, setNumberPosts] = useState<userPostsNo[]>([])
  const [noInteracted, setNumberInteracted] = useState<userPostsNo[]>([])
  useEffect(() => {
    handleLayoutChange()
  }, [])

  useEffect(() => {
    getUserPostCount()
      .then(res => {
        if (res.status === 200) {
          setNumberPosts(res.data.noPosts)
        }
      })
      .catch(() => {
        toast.error("Could not get post count, please contact administrator", {
          duration: 2000
        })
      })

    getPostsInteractedCount()
      .then(res => {
        setNumberInteracted(res.data.noPosts)
      })
      .catch(() => {
        toast.error("Could not get post interaction, please contact administrator", {
          duration: 2000
        })
      })
  }, [])

  const getPostsInteractedCount = async () => {
    const request = await fetchDataWithConfig('posts/GetPostTimeInteracted', { withCredentials: true })
    return request
  }

  const getUserPostCount = async () => {
    const request = await fetchDataWithConfig(`posts/GetUserPostCount`, {
      withCredentials: true
    })
    return request
  }

  const handleLayoutChange = () => {
    saveSettings({ ...settings, navHidden: false })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <ApexLineChart title={'Number of posts'} data={noPosts} />
        </Grid>
        <Grid item md={4}>
          <ApexLineChart title={'Times interacted'} data={noInteracted} />
        </Grid>
        <Grid item md={4}>
          <ApexLineChart title={'Times clicked'} data={[]} />
        </Grid>
        <Grid item md={12}>
          <List />
        </Grid>
      </Grid>
    </>
  )
}

export default UserPosts
