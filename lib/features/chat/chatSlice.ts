import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatMessage {
  user: string
  message: string
}

export interface ChatState {
  messages: ChatMessage[]
}

const initialState: ChatState = {
  messages: [
    {
      user: 'model',
      message: 'Hello I am Gemini Chat with me?',
    },
  ],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push({
        user: action.payload.user,
        message: action.payload.message,
      })
    },
  },
})

export const { updateValue } = chatSlice.actions

export default chatSlice.reducer
