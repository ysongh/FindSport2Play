import axios from '../axios-lists';

import { GET_USER, USER_LOADING,  } from './types';

export const getUser = (id) => dispatch => {
    dispatch(setUserLoading());
    axios
        .get(`/api/users/${id}`)
        .then(res => 
            dispatch({
                type: GET_USER,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_USER,
                payload: null
            })
        );
};

export const setUserLoading = () => {
    return{
        type: USER_LOADING
    };
};