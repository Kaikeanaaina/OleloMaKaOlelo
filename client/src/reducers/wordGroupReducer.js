import { FETCH_WORD_GROUPS } from '../actions/types.js'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_WORD_GROUPS:
      return action.payload || false
    default:
      return state
  }
}
