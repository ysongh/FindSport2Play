import jwt_decode from 'jwt-decode';

import axios from '../axios-lists';
import setAuthToken from '../utilis/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      let errorData;
      if(err.response) errorData = err.response.data;
      else errorData = { servererror: "Something went wrong on the server, Try again later!" };

      dispatch({
        type: GET_ERRORS,
        payload: errorData
      })
    });
};

export const loginUser = (userData) => dispatch => {
  axios.patch('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      let errorData;
      if(err.response) errorData = err.response.data;
      else errorData = { servererror: "Something went wrong on the server, Try again later!" }

      dispatch({
        type: GET_ERRORS,
        payload: errorData
      })
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};