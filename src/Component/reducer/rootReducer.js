
const initialState = {
    singleCounter : 0,
    // doubleCounter : 0,
}

export default function rootReducer (state = initialState, action){

    switch(action.type){
        case 'Increment': 
        return  {singleCounter : state.singleCounter + 1};

        case 'Decrement': 
        return  {singleCounter : state.singleCounter - 1};

        // case 'Double' :
        //     return {
        //         doubleCounter : state.doubleCounter + 2
        //     };

        default :
        return state;
    }
}
