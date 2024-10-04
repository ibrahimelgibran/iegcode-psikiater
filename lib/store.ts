import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/lib/features/counter/counterSlice'
import textareaReducer from '@/lib/features/textarea/textareaSlice'
import scoreReducer from '@/lib/features/score/scoreSlice'
import chatReducer from '@/lib/features/chat/chatSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      textarea: textareaReducer,
      score: scoreReducer,
      chat: chatReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
