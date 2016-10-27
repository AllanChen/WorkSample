import cityData from '../Store/city';
import * as types from '../Action/actionTypes';
const initCityState = cityData;

let cityReducer = (state = initCityState, action) => {
    switch (action.type) {
        case types.FETCH_CITY_LIST:
            return Object.assign({},state)

        case types.SELECT_CITY_ROWID:
           return Object.assign({},state[action.rowID])

        default:
            return state;

    }
}

export default cityReducer;
