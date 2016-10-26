import cityData from '../Store/city';
import * as types from '../Action/actionTypes';
const initCityState = cityData;

let cityReducer = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_CITY_LIST:
            return Object.assign({},{0:"11",1:"22"})

        case types.SELECT_CITY_ROWID:
           return Object.assign({},{0:"33",1:"44"})

        default:
            return state;

    }
}

export default cityReducer;
