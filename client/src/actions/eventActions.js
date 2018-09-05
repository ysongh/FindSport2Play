import axios from '../axios-lists';

import { GET_EVENTS, EVENT_LOADING } from './types';

export const getEvents = () => dispatch => {
    dispatch(setEventLoading());
    axios.get('/api/events/all')
        .then(res =>
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_EVENTS,
                payload: {}
            })
        );
};

export const setEventLoading = () => {
    return{
        type: EVENT_LOADING
    };
};