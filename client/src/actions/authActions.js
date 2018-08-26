import axios from '../axios-lists';
import { GET_ERRORS } from './types';

export const registerUser = userData => dispatch => {
    axios.post('/api/users/register', userData)
      .then(res => console.log(res.data))
      .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
      );
};