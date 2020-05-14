import { FETCH_ALL_HUAOLELO } from '../actions/types.js'

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_HUAOLELO:
            return action.payload
        default:
            return state
    }
}