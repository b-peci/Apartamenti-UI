import { GetStaticPaths } from "next/types";
import { DEFAULT_GUID_VALUE } from "../add-post/[postId]";
import imageSrc from "../../../../public/images/pages/404.png"
import imageSrc2 from "../../../../public/images/pages/401.png"
import Image from 'next/image'
import DOMPurify from 'dompurify'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData, fetchDataWithConfig } from "src/@core/utils/axios";
import { postDetails } from "src/models/postDetails";

const PostDetails = ({ postId }) => {

  const [activeImage, setActiveImage] = useState('');
  const [postDetails, setPostDetails] = useState<postDetails>();
  const [isUserCreator, setIsUserCreator] = useState<boolean>(false);
  const checkImageFullSize = (src: string) => {
    setActiveImage(src);
  }

  const checkIfLoginUserIsCreator = async () => {
    const request = await fetchDataWithConfig("posts/IsUserCreator/" + postId, { withCredentials: true });
    setIsUserCreator(request.status === 200 && request.data);
  }

  const fetchPostDetails = async () => {
    if (!(!!postId) || postId === DEFAULT_GUID_VALUE) return;
    const request = await fetchData(`posts/GetPostById/${postId}`);
    if (request.isSuccess === true) {
      const details: postDetails = request.data;
      setPostDetails(details);
      console.log('This is details', details);
    }
  }

  useEffect(() => {
    fetchPostDetails()
    checkIfLoginUserIsCreator();
  }, [])

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Image src={activeImage} alt={"Main image"} width={500} height={500} />
        <Box>
          {
            postDetails?.files.map((item, index) => {
              return (
                <Image
                  key={index}
                  onClick={() => setActiveImage(`data:image/${item.extension};base64, ${item.base64Content}`)}
                  style={{ marginRight: '.2em', cursor: 'pointer', border: activeImage === `data:image/${item.extension};base64, ${item.base64Content}` ? "1px solid white" : 'none' }}
                  src={`data:image/${item.extension};base64, ${item.base64Content}`}
                  alt={"Main image"}
                  width={100}
                  height={100} />
              )
            })
          }
        </Box>
      </Box>
      <Box sx={{ marginTop: '2em' }}>
        <Typography variant="h2">{postDetails?.title}</Typography>
        <Box>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDetails?.description ?? "") }} />
        </Box>
      </Box>
      {!isUserCreator &&
        <Box>
          <Button variant='contained'>Contact publisher</Button>
        </Box>
      }
      <Box sx={{ marginTop: '2em' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Extra Details</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component={"th"} scope={"row"}>
                  Is for rent
                </TableCell>
                <TableCell align="center">{postDetails?.isForRenting ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"} scope={"row"}>
                  Is for selling
                </TableCell>
                <TableCell align="center">{postDetails?.isForSelling ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"} scope={"row"}>
                  No rooms
                </TableCell>
                <TableCell align="center">{postDetails?.noRooms}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"} scope={"row"}>
                  Space
                </TableCell>
                <TableCell align="center">{postDetails?.space} m <sup>2</sup></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"} scope={"row"}>
                  Price
                </TableCell>
                <TableCell align="center">{postDetails?.price} €</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )


}

export default PostDetails;

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {
  const { postId } = params
  return {
    props: {
      postId
    }
  }
}
