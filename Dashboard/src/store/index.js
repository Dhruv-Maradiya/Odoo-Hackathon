// ** Toolkit imports
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// ** Reducers
import dashboard from 'src/store/dashboard/dashboard'
import settings, { resetStore } from 'src/store/settings/user'
import exam from 'src/store/exam/exam'

const combinedReducer = combineReducers({
  settings,
  dashboard,
  exam
})

const rootReducer = (state, action) => {
  if (action.type === resetStore.type) {
    state = undefined
  }

  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
