import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER, GET_NOTIFICATION } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    notifications: {
        unread: 0,
        notification: []
    }
};

export default function(state = initialState, action){
    console.log(action.payload)
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_NOTIFICATION:
            return{
                ...state,
                notifications: action.payload
            };
        default:
            return state;
    }
}