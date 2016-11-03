import * as types from '../constants/MenuConstant'

const menuReducer = (state = initState, action) => {
    switch (action.type) {
        case types.MenuToggle:
            return [
                ...state,
                action.marker
            ]

        default:
            return state
    }
}

export default markerReducer