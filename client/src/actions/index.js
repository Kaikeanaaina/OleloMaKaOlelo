// this is an *Action Creator* is the dispatch
// *Action* is the type and payload

import axios from 'axios'
import { FETCH_USER, FETCH_ALL_HUAOLELO, FETCH_WORD_GROUPS, HIGHLIGHT_A_HUAOLELO, FETCH_HIGHLIGHTED_HUAOLELO} from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchNaHuaolelo = () => async dispatch => {
  const res = await axios.get('/api/huaolelo')
  dispatch({ type: FETCH_ALL_HUAOLELO, payload: res.data})
}

export const submitHuaolelo = (values, history) => async dispatch => {
  const res = await axios.post('/api/huaolelo', values)
  //history.push('/huaolelo')
  dispatch({ type: FETCH_ALL_HUAOLELO, payload: res.data})
}

export const editHuaolelo = (values, history) => async dispatch => {
  const res = await axios.put('/api/huaolelo', values)
  //history.push('/huaolelo')
  dispatch({ type: FETCH_ALL_HUAOLELO, payload: res.data})
}

export const deleteHuaolelo = (values, history) => async dispatch => {
  const res = await axios.delete(`/api/huaolelo/$(values._id)`, values)
  dispatch({ type: FETCH_ALL_HUAOLELO, payload: res.data})
}

export const highlightAHuaolelo = (values, history) => async dispatch => {
  dispatch({ type: HIGHLIGHT_A_HUAOLELO, payload: values})
}

export const fetchHighlightedHuaolelo  = () => async dispatch => {
  dispatch({type: FETCH_HIGHLIGHTED_HUAOLELO})
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