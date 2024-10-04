import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ScoreState {
  value: number
}

const initialState: ScoreState = {
  value: 0,
}

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    incrementScore: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { incrementScore } = scoreSlice.actions

export default scoreSlice.reducer
