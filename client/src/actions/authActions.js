import axios from '../axios-lists';

import setAuthToken from '../utilis/setAuthToken';
import { GET_ERRORS } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};