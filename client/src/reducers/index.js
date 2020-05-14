import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import naHuaoleloReducer from './naHuaoleloReducer'
import huaoleloReducer from './huaoleloReducer'
import wordGroupReducer from './wordGroupReducer'

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  naHuaolelo: naHuaoleloReducer,
  huaolelo: huaoleloReducer,
  wordGroups: wordGroupReducer
})

