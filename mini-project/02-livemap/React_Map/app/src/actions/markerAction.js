import * as types from '../constants/markerConstant'

export function addMarker(marker) {
    return {
        type: types.ADD_MARKER,
        marker
    }
}

export function removeMarker(userId) {
    return {
        type: types.REMOVE_MARKER,
        userId
    }
}

export function setLocation(userId, location) {
    return {
        type: types.SET_LOCATION,
        userId,
        location
    }
}