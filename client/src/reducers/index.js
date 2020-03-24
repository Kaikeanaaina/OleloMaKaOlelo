import { combineReducers } from 'redux'
import authReducer from './authReducer'
import huaoleloReducer from './huaoleloReducer'
import wordGroupReducer from './wordGroupReducer'

export default combineReducers({
  auth: authReducer,
  huaolelo: huaoleloReducer,
  wordGroups: wordGroupReducer
})
