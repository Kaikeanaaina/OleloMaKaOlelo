import axios from 'axios'
import { FETCH_USER, FETCH_HUAOLELO} from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')

  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchHuaolelo = () => async dispatch => {
  const res = await axios.get('/api/huaolelo')

  dispatch({ type: FETCH_HUAOLELO, payload: res.data})
}