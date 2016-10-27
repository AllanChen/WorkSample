
export let  mainReducer = (state = [], action) =>{
  switch(action.type){

    case "FETCH_WEATHER_DATA":
      return state;

    case "FETCH_THOURS_DATA":
      return state;
      
    default:
      return state;
  }
}

export default mainReducer;
