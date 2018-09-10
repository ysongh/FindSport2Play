import axios from '../axios-lists';

import { GET_EVENTS, EVENT_LOADING, GET_ERRORS  } from './types';

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

export const createEvent = (eventData, history) => dispatch => {
    axios
        .post('/api/events', eventData)
        .then(res => history.push('/events'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setEventLoading = () => {
    return{
        type: EVENT_LOADING
    };
};