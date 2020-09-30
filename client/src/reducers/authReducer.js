import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER, GET_NOTIFICATION, AUTH_ERRORS } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    notifications: {
        unread: 0,
        notification: []
    },
    error: ''
};

export default function(state = initialState, action){
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
        case AUTH_ERRORS:
            return{
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}