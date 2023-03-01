// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { deleteDataWithConfig, fetchDataWithConfig } from './axios'

interface DataParams {
  pageNumber: number
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}



export const fetchData = createAsyncThunk('posts/fetchData', async (params: DataParams) => {
  const response = await fetchDataWithConfig("Posts/GetUserPosts/" + params.pageNumber, { withCredentials: true });
  return response.data
})





// ** Add User
export const addPost = createAsyncThunk(
  'posts/addPost',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/users/add-user', {
      data
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Delete User
export const deleteUser =
  async (id: number | string, { dispatch }: Redux) => {
    const response = await deleteDataWithConfig(`posts/deletepost/${id}`, { withCredentials: true });
    dispatch(fetchData({ pageNumber: 1 }))
    return response.data
  }

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      state.total = action.payload.length
      state.allData = action.payload
    })
  }
})

export default postsSlice.reducer
