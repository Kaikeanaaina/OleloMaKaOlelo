import { HIGHLIGHT_A_HUAOLELO, FETCH_HIGHLIGHTED_HUAOLELO } from '../actions/types.js'

export default function(state = {}, action) {
    console.log('1reducer', state)
    switch (action.type) {
        case HIGHLIGHT_A_HUAOLELO:
            state = action.payload
            console.log('2reducer', state)
            return state
        case FETCH_HIGHLIGHTED_HUAOLELO:
            console.log('3reducer', state)
            return state
        default:
            console.log('4reducer', state)
            return state
    }
}