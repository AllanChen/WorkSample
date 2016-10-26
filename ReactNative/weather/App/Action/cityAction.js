import * as types from '../Action/actionTypes';

export let hello = (isRefreshing, isLoading) =>{
    return{
        type:types.HELLO,
    }
}

export let featchAddress = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_CITY_LIST,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

export let selectedRowID = (rowID) => {
    return{
        type: types.SELECT_CITY_ROWID,
        rowID:rowID
    }
}
