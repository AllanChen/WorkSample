import cityData from '../Store/city';
import * as types from '../Action/actionTypes';
const initCityState = cityData;

let cityReducer = (state = initCityState, action) => {
    switch (action.type) {
        case types.FETCH_CITY_LIST:
            return Object.assign({}, state)
            break;
    
        default:
            console.log('this is defalut');
            return state
            break;
    }
}

export default cityReducer;