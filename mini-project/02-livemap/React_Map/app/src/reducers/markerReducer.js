import * as types from '../constants/markerConstant'

const initState = [
    {
        position: {lat: 25.0479278, lng: 121.514886},
        text: '台北車站',
        photo: 'https://goo.gl/7uwlYS'
    }, {
        position: {lat: 24.9892108, lng: 121.3113509},
        text: '桃園車站',
        photo: 'https://goo.gl/0AnhZ3'
    }, {
        position: {lat: 24.8015844, lng: 120.9694624},
        text: '新竹車站',
        photo: 'https://goo.gl/z3Mj3X'
    }, {
        position: {lat: 24.5700249, lng: 120.8201489},
        text: '苗栗車站',
        photo: 'https://goo.gl/7uwlYS'
    }, {
        position: {lat: 24.1367589, lng: 120.6826378},
        text: '台中車站',
        photo: 'https://goo.gl/vBXIPX'
    }, {
        position: {lat: 23.7362249, lng: 120.4143259},
        text: '雲林車站',
        photo: 'https://goo.gl/47m2KZ'
    }, {
        position: {lat: 23.4791236, lng: 120.4389441},
        text: '嘉義車站',
        photo: 'https://goo.gl/kl1O0r'
    }, {
        position: {lat: 22.9971206, lng: 120.2104066},
        text: '台南車站',
        photo: 'https://goo.gl/wvS3Jj'
    }, {
        position: {lat: 22.6397664, lng: 120.2999129},
        text: '高雄車站',
        photo: 'https://goo.gl/ueBUZp'
    }, {
        position: {lat: 22.6688619, lng: 120.4837692},
        text: '屏東車站',
        photo: 'https://goo.gl/aqM65s'
    }, {
        position: {lat: 22.7930213, lng: 121.1205129},
        text: '台東車站',
        photo: 'https://goo.gl/rx0mh6'
    }, {
        position: {lat: 23.9933334, lng: 121.5988503},
        text: '花蓮車站',
        photo: 'https://goo.gl/jhOhHW'
    }
];

const markerReducer = (state=initState, action) => {
    let index
    switch(action.type) {
        case types.ADD_MARKER:
            return [
                ...state,
                action.marker
            ]
        case types.REMOVE_MARKER:
            index = state.findIndex((obj) => obj.userId == action.userId)
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        case types.SET_LOCATION:
            index = state.findIndex((obj) => obj.userId == action.userId)
            
            return [
                ...state.slice(0, index),
                { ...state[index], position: action.location },
                ...state.slice(index+1)
            ]
        default:
            return state
    }
}

export default markerReducer