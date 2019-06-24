import axios from '../axios-lists';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, GET_NOTIFICATION } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    dispatch(getNotification());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

export const getUserProfile = (id) => dispatch => {
    dispatch(setProfileLoading());
    dispatch(getNotification());
    axios.get(`/api/profile/user/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/profile'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
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