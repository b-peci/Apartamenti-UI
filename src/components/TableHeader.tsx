// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



const TableHeader = () => {
  // ** Props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link style={{textDecoration: 'none'}} href={"/posts/add-post/" + "00000000-0000-0000-0000-000000000000"}>
          <Button  variant='contained' sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            Add New Post
          </Button>
        </Link>

      </Box>
    </Box>
  )
}

export default TableHeader
