// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { Dispatch } from 'redux'
import { SendMsgParamsType } from 'src/models/chatTypes'
import { fetchDataWithConfig, postDataWithConfig } from './axios'

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {

  const request = await fetchDataWithConfig('user/UserBasicInfo', { withCredentials: true });
  const responseObject = {
    id: request.data.user,
    avatar: "/images/avatars/1.png",
    fullName: request.data.fullName,
    role: "admin",
    about: "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
    status: "online",
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  }

  return responseObject
})

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  //const response = await axios.get('/apps/chat/chats-and-contacts')
  const response = await fetchDataWithConfig('Chat/UserChats', { withCredentials: true });
  return response.data
})


// ** Select Chat
export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (id: string, { dispatch }: { dispatch: Dispatch<any> }) => {
    const response = await fetchDataWithConfig("chat/UserChats/" + id, { withCredentials: true });
    await dispatch(fetchChatsContacts());
    const responseObject = {
      chat: response.data.data,
      contact: {
        fullName: response.data.data[0].senderFullName,
        status: 'online',
        id: id,
      }
    }
    return responseObject
  }
)

// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgParamsType, { dispatch }) => {

  const request = await postDataWithConfig("chat/sendMessage", {
    toUserId: obj.contact!.id,
    message: obj.message

  }, { withCredentials: true })
  console.log(request)
  if (obj.contact) {
    await dispatch(selectChat(obj.contact.id))
  }
  await dispatch(fetchChatsContacts())

  return request.data
})

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: null,
    selectedChat: null
  },
  reducers: {
    removeSelectedChat: state => {
      state.selectedChat = null
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload
    })
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts
      state.chats = action.payload.data;
    })
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
    })
  }
})

export const { removeSelectedChat } = appChatSlice.actions

export default appChatSlice.reducer
