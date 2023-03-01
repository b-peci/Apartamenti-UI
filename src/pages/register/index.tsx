// ** React Imports
import { useState, Fragment, ChangeEvent, ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { State } from '../login/index'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'
import IconSVG from 'src/components/IconSVG'
import { fetchData, postData } from 'src/@core/utils/axios'
import { useRouter } from 'next/router'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  // ** States
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false
  })

  // ** Hook
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const [IsPasswordRequestsSatisfied, setIsPasswordRequestsSatisfied] = useState(true)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [registerError, setRegisterError] = useState('')
  const router = useRouter()
  const isPasswordValid = () => {
    if (values.password.length < 8) {
      setIsPasswordRequestsSatisfied(false)
      setPasswordErrorMessage('Password should be larger than 8 characters')

      return false
    }
    if (!values.password.match(new RegExp('[A-Z]+'))) {
      setIsPasswordRequestsSatisfied(false)
      setPasswordErrorMessage('Password should contain  at least one uppercase letter')

      return false
    }
    if (!values.password.match(new RegExp('[a-z]+'))) {
      setIsPasswordRequestsSatisfied(false)
      setPasswordErrorMessage('Password should contain  at least one lowercase letter')

      return false
    }
    if (!values.password.match(new RegExp('[0-9]+'))) {
      setIsPasswordRequestsSatisfied(false)
      setPasswordErrorMessage('Password should contain  at least one number')

      return false
    }

    return true
  }

  const setErrorStatesToDefault = () => {
    setRegisterError('')
    setIsPasswordRequestsSatisfied(true)
    setPasswordErrorMessage('')
  }
  const isEmailTaken = async (email: string): Promise<boolean | void> => {
    const isTaken = await fetchData(`user/IsEmailTaken/${email}`)
    return isTaken as boolean
  }
  const registerUser = async (e: any) => {
    e.preventDefault()
    setErrorStatesToDefault()
    const isValid = isPasswordValid()
    if (!isValid) return

    const newUserData = {
      email: values.email,
      password: values.password,
      FirstName: '',
      lastName: ''
    }
    const emailTaken: boolean | void = await isEmailTaken(newUserData.email)
    if (emailTaken == true) {
      setRegisterError('Email is already taken')
      return
    }
    const createUserRequest = await postData('user/adduser', newUserData)
    if (createUserRequest.status === 200 && createUserRequest.data.includes('Email sent successfully')) {
      router.push('/email-verification')
    } else {
      setRegisterError('Something went wrong, please try again later')
    }
  }

  return (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconSVG />
              <Typography sx={{ ml: 2.5, fontWeight: 600, fontSize: '1.625rem', lineHeight: 1.385 }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h6' sx={{ mb: 1.5 }}>
                Adventure starts here 🚀
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={registerUser}>
              <TextField fullWidth type='email' onChange={handleChange('email')} label='Email' sx={{ mb: 4 }} />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-register-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {(!IsPasswordRequestsSatisfied || registerError) && (
                <Typography variant='subtitle2' color={'red'} textAlign='center'>
                  {passwordErrorMessage ? passwordErrorMessage : registerError}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Fragment>
                    <span>I agree to </span>
                    <LinkStyled href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </Fragment>
                }
              />
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography>
                  <LinkStyled href='/pages/auth/login-v1' sx={{ fontSize: '1rem' }}>
                    Sign in instead
                  </LinkStyled>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Register
