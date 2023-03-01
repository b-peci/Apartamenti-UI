import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { GetStaticPaths } from 'next/types'
import React, { useEffect, useState } from 'react'
import { postData } from 'src/@core/utils/axios'

const EmailVerified = ({ userId }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  // const userId = router.query.userId

  useEffect(() => {
    postData('user/verifyEmail', { userId: userId })
      .then(res => {
        if (res.status === 200 && res.data === "User's account has been verified") {
          setMessage('Your account has been set, you will be redirected shortly')
          setTimeout(() => {
            router.push({
              pathname: '/basic-info'
            })
          }, 3000)
        }
      })
      .catch(() => {
        setMessage('Something went wrong, please try again')
      })
  }, [])

  return (
    <>
      <Typography variant='h1'>{message}</Typography>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {
  const { userId } = params
  return {
    props: {
      userId
    }
  }
}

export default EmailVerified
