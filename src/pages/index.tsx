// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = () => {
  return '/home'
}

const Home = () => {
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    // Redirect user to Home URL
    router.replace(getHomeRoute())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
