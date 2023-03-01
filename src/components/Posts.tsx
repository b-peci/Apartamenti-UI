import postsThumbnailData from 'src/models/postsThumbnailData'
import Grid from '@mui/material/Grid'
import CardImgTop from 'src/components/CardImgTop'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'

interface IPostsProps {
  posts: postsThumbnailData[]
}
const Posts = (props: IPostsProps) => {
  const { posts } = props
  const router = useRouter()

  const viewPostDetails = (id: string) => {
    router.push(`/posts/post-details/${id}`)
  }

  return (
    <>
      {posts.map(item => {
        return (
          <Grid item key={item.id} md={3}>
            <CardImgTop
              onClickEvent={() => viewPostDetails(item.id)}
              title={item.title}
              price={'€' + item.price}
              image={`data:image/${item.imageExtension};base64,${item.base64MainImage}`}
            />
          </Grid>
        )
      })}
    </>
  )
}
export default Posts
