import * as types from '../Action/actionTypes';
let thoursReducer = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_CITY_LIST:
            return Object.assign({}, state)


        default:
            return state;

    }
}

export default thoursReducer;
