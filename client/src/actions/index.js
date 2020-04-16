import axios from 'axios'
import { FETCH_USER, FETCH_HUAOLELO, FETCH_WORD_GROUPS} from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchHuaolelo = () => async dispatch => {
  const res = await axios.get('/api/huaolelo')
  dispatch({ type: FETCH_HUAOLELO, payload: res.data})
}

export const submitHuaolelo = (values, history) => async dispatch => {
  const res = await axios.post('/api/huaolelo', values)
  //history.push('/huaolelo')
  dispatch({ type: FETCH_HUAOLELO, payload: res.data})
}

export const fetchWordGroups = () => async dispatch => {
  const res = await axios.get('/api/wordGroups')
  dispatch({ type: FETCH_WORD_GROUPS, payload: res.data})
}

export const submitWordGroup = (values, history) => async dispatch => {
  const res = await axios.post('/api/wordGroup', values)
  dispatch({ type: FETCH_WORD_GROUPS, payload: res.data})
}

export const editWordGroup = (values, history) => async dispatch => {
  const res = await axios.put('/api/wordGroup', values)
  dispatch({ type: FETCH_WORD_GROUPS, payload: res.data})
}

export const deleteWordGroup = (values, history) => async dispatch => {
  const res = await axios.delete(`/api/wordGroup/${values._id}`, values)
  dispatch({ type: FETCH_WORD_GROUPS, payload: res.data})
}