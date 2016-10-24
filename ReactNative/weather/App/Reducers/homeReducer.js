import city from '../Store/city';
import weather from '../Store/weather';
import thours from '../Store/thours';
const  initialState = {
    city : city,
    thours : thours,
    weather : weather,
};

function homeReducer(state = initialState, action){
    switch(action.type)
    {
        case FEATCH_ALL_DATA:
            return Object.assign({},state,{city:[]});

        default:
            return state;       
    }
}

export default homeReducer;