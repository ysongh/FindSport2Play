import axios from '../axios-lists';

import { GET_PROFILE, PROFILE_LOADING } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
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

export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    };
};