import { FETCH_HUAOLELO } from '../actions/types.js'

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_HUAOLELO:
            return action.payload
        default:
            return state
    }
}