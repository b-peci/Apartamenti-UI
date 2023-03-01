// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Second Page',
    path: '/second-page',
    icon: 'tabler:mail',
  },
  {
    path: '/acl',
    title: 'Access Control',
    icon: 'tabler:shield',
  }
]

export default navigation
