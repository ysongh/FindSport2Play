import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import eventReducer from './eventReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    events: eventReducer
});