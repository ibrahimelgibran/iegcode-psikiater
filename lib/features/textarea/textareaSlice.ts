import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TextareaState {
  value: string
}

const initialState: TextareaState = {
  value: '',
}

export const textareaSlice = createSlice({
  name: 'textarea',
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { updateValue } = textareaSlice.actions

export default textareaSlice.reducer
