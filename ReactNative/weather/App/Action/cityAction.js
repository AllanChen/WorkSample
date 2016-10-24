
import * as types from '../Action/actionTypes';
export let cityAction = (isRefreshing, isLoading) =>{
    
} 


export let featchAddress = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_CITY_LIST,        
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}