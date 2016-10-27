import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import cityReducer from './cityReducer';
import thoursReducer from './thoursReducer';
import weatherReducer from './weatherReducer';
import mainReducer from './mainReducer';

export default rootReducer = combineReducers ({
    mainReducer,
    homeReducer,
    cityReducer,
    thoursReducer,
    weatherReducer,
});
