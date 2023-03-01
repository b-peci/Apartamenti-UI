import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Typography,
  Menu,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import TableHeader from './TableHeader'
import Icon from 'src/@core/components/icon'

// import AddUserDrawer from './AddUserDrawer'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PropertyType from 'src/enums/PropertyType'
import { deleteDataWithConfig } from 'src/@core/utils/axios'
import DialogTransition from './Dialog'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/@core/utils/postStore'
import { AppDispatch, RootState } from 'src/@core/utils/store'
import { useRouter } from 'next/router'

export type UserPost = {
  userId: string
  id: string
  title: string
  space: number
  type: PropertyType
}


interface CellType {
  row: UserPost
}

const renderClient = (row: UserPost) => {
  return (
    <CustomAvatar skin='light' sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}>
      {row.title}
    </CustomAvatar>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'title',
    headerName: 'Title',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {row.title}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'type',
    minWidth: 170,
    headerName: 'Type',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.type.toString()}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Space',
    field: 'space',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.space}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    setAnchorEl(null)
    setOpenDialog(true)
  }

  const handleEdit = () => {
    router.push({
      pathname: `/posts/add-post/${id}`
    })
  }


  const deletePost = async () => {
    const request = await deleteDataWithConfig(`Posts/DeletePost/${id}`, { withCredentials: true });
    if (request.status === 200) {
      dispatch(fetchData({
        pageNumber: 1
      }))
      toast.success("Deleted successfully", {
        duration: 1500
      })
    }
  }

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <DialogTransition open={openDialog} handleClose={async (isConfirmed: boolean) => {
        setOpenDialog(false);
        if (isConfirmed) {
          await deletePost();
        }
      }}
        title="Delete post?"
        text='You are about to delete the selected post, are you sure you want to' />
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/posts/post-details/${id}`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}



const List = () => {
  const [pageSize, setPageSize] = useState<number>(10)
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.posts)


  useEffect(() => {
    dispatch(
      fetchData({
        pageNumber: 1
      })
    )
  }, [dispatch])


  return (
    <Grid container spacing={6.5}>

      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Posts' />

          <Divider sx={{ m: '0 !important' }} />
          <TableHeader />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.data}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Grid>
  )
}

export default List
