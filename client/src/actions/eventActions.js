import axios from '../axios-lists';

import { GET_EVENTS, GET_EVENT, EVENT_LOADING, GET_ERRORS, CLEAR_ERRORS, DELETE_EVENT, GET_NOTIFICATION, CHANGE_SNACKBAR_MESSAGE  } from './types';

export const getAllEvents = () => dispatch => {
    dispatch(setEventLoading());
    dispatch(getNotification());

    axios.get('/api/events/all')
        .then(res => {
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            });
        })
        .catch(err => 
            dispatch({
                type: GET_EVENTS,
                payload: {}
            })
        );
};

export const getEvents = sport => dispatch => {
    dispatch(setEventLoading());
    dispatch(getNotification());

    let url = '/api/events/events';
    if(sport && sport !== 'All Sports') url = `/api/events/events?sport=${sport}`;

    axios.get(url)
        .then(res => {
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            });
        })
        .catch(err => 
            dispatch({
                type: GET_EVENTS,
                payload: {}
            })
        );
};

export const getEvent = (id) => dispatch => {
    dispatch(setEventLoading());
    dispatch(getNotification());
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
 
export const joinEvent = (eventID) => dispatch => {
    axios
        .put(`/api/events/${eventID}/join`)
        .then(res =>{
            dispatch({
                type: CHANGE_SNACKBAR_MESSAGE,
                payload: res.data.join
            });
            dispatch({
                type: GET_EVENT,
                payload: res.data.event
            });
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: CHANGE_SNACKBAR_MESSAGE,
                    payload: err.response.data.error
                })
            }
        });
};

export const flagEvent = (eventID) => dispatch => {
    axios
        .put(`/api/events/${eventID}/flag`)
        .then(res =>{
            dispatch({
                type: GET_EVENT,
                payload: res.data.event
            });
        })
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

export const getNotification = () => dispatch => {
  axios
    .get(`/api/notification`)
    .then(res => 
        dispatch({
            type: GET_NOTIFICATION,
            payload: res.data
        })
    )
    .catch(err =>
        console.log(err)
    );
};