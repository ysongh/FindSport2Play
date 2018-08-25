import { TEST_DISPATCH } from './types';

export const registerUser = userData => {
    return{
        type: TEST_DISPATCH,
        payload: userData
    };
};