// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Chat',
      path: '/chat',
      icon: 'tabler:mail'
    },
    {
      path: '/acl',
      title: 'Access Control',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
