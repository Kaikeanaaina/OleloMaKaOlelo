import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import huaoleloReducer from './huaoleloReducer'
import wordGroupReducer from './wordGroupReducer'

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  huaolelo: huaoleloReducer,
  wordGroups: wordGroupReducer
})

