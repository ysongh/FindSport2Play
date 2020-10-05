import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER, GET_NOTIFICATION, SET_AUTH_LOADING, REMOVE_AUTH_LOADING } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: {},
    notifications: {
        unread: 0,
        notification: []
    }
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
        case SET_AUTH_LOADING:
            return{
                ...state,
                loading: true
            };
        case REMOVE_AUTH_LOADING:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
}