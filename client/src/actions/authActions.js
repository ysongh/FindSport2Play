import jwt_decode from 'jwt-decode';

import axios from '../axios-lists';
import setAuthToken from '../utilis/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, SET_AUTH_LOADING, REMOVE_AUTH_LOADING } from './types';

export const registerUser = (userData, history) => dispatch => {
  dispatch(setAuthLoading());

  axios.post('/api/users/register', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(removeAuthLoading());

      history.push('/profile');
    })
    .catch(err => {
      let errorData;
      if(err.response) errorData = err.response.data;
      else errorData = { servererror: "Something went wrong on the server, Try again later!" };

      dispatch({
        type: GET_ERRORS,
        payload: errorData
      });
      dispatch(removeAuthLoading());
    });
};

export const loginUser = (userData) => dispatch => {
  dispatch(setAuthLoading());

  axios.patch('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(removeAuthLoading());
    })
    .catch(err => {
      let errorData;
      if(err.response) errorData = err.response.data;
      else errorData = { servererror: "Something went wrong on the server, Try again later!" }

      dispatch({
        type: GET_ERRORS,
        payload: errorData
      });
      dispatch(removeAuthLoading());
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

const setAuthLoading = () => {
  return{
      type: SET_AUTH_LOADING
  }
}

const removeAuthLoading = () => {
  return{
      type: REMOVE_AUTH_LOADING
  }
}