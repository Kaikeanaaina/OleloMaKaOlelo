import { combineReducers } from 'redux'
import authReducer from './authReducer'
import huaoleloReducer from './huaoleloReducer'

export default combineReducers({
  auth: authReducer,
  huaolelo: huaoleloReducer
})
