import axios from '../axios-lists';

import { GET_EVENTS, GET_EVENT, EVENT_LOADING, GET_ERRORS, CLEAR_ERRORS, DELETE_EVENT  } from './types';

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

export const getEvent = (id) => dispatch => {
    dispatch(setEventLoading());
    axios
        .get(`/api/events/${id}`)
        .then(res => 
            dispatch({
                type: GET_EVENT,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_EVENT,
                payload: null
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

export const addComment = (eventID, commentData, history) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/events/${eventID}/comments`, commentData)
        .then(res => 
            dispatch({
                type: GET_EVENT,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteEvent = id => dispatch => {
    axios
        .delete(`/api/events/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_EVENT,
                payload: id
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteComment = (eventID, com_id) => dispatch => {
     axios
         .delete(`/api/events/${eventID}/comments/${com_id}`)
         .then(res => 
             dispatch({
                type: GET_EVENT,
                payload: res.data
             })
         )
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

// Clear errors
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    };
};