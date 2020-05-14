import { HIGHLIGHT_A_HUAOLELO } from '../actions/types.js'

export default function(state = {}, action) {
    switch (action.type) {
        case HIGHLIGHT_A_HUAOLELO:
            return action.payload
        default:
            return state
    }
}