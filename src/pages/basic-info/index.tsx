import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { postDataWithConfig } from 'src/@core/utils/axios'

const BasicInfo = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const router = useRouter()
  const user = localStorage.getItem('user')
  const updateUserBasicInfo = async () => {
    const request = await postDataWithConfig(
      'user/UpdateUserBasicInfo',
      {
        firstName,
        lastName,
        userId: user
      },
      {
        withCredentials: true
      }
    )
    if (request.status === 200 && request.data === 'Token Generated') {
      router.push('/dashboard/user-posts')
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%'
        }}
      >
        <Typography variant='h6' sx={{ mb: 4 }}>
          Tell us who you are
        </Typography>
        <TextField
          autoFocus
          type={'text'}
          onChange={e => setFirstName(e.currentTarget.value)}
          label='First Name'
          sx={{ mb: 4, width: '40%' }}
        />
        <TextField
          type={'text'}
          onChange={e => setLastName(e.currentTarget.value)}
          label='Last Name'
          sx={{ mb: 4, width: '40%' }}
        />
        <Button size='large' onClick={updateUserBasicInfo} variant='contained' sx={{ mb: 4, width: '40%' }}>
          Save
        </Button>
      </Box>
    </>
  )
}

export default BasicInfo
