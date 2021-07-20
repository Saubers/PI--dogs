import {GET_BREED_DETAIL, GET_ALL_BREEDS, GET_BREED, GET_TEMPERAMENT, BREED_SORT} from '../actions/index'

const initialState = { 
    breeds : [],
    breedDetail : {},
    temperament : [],
   
}

function rootReducer(state = initialState, action){

    if(action.type === GET_ALL_BREEDS) {
        return {
            ...state,
            breeds : action.payload
        }
    }

    if(action.type === GET_BREED_DETAIL) {
        return {
            ...state,
            breedDetail : action.payload
        }
    }

    if(action.type === GET_BREED) {
        return {
            ...state,
            breed : action.payload
        }
    }



    if(action.type === GET_TEMPERAMENT) {
        return {
            ...state,
            temperament : action.payload
        }
    }


    if(action.type === BREED_SORT) {
        return {
            ...state,
            breed : action.payload
        }
    }

    return state;
}

export default rootReducer;