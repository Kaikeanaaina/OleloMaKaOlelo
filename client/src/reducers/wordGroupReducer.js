import { FETCH_WORD_GROUPS } from '../actions/types.js'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WORD_GROUPS:
      return action.payload
    default:
      return state
  }
}
