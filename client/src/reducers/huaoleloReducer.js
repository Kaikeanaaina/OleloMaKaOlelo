import { HIGHLIGHT_A_HUAOLELO } from '../actions/types.js'


const initialState = {
    stateHuaolelo: {}
  }

export default function(state = initialState.stateHuaolelo, action) {
    switch (action.type) {
        case HIGHLIGHT_A_HUAOLELO:
            const {payload} = action
            return { ...state, payload}
        default:
            return state
    }
}