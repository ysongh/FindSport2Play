const initialState = {
    user: [],
    loading: false
};

export default function(state = initialState, action){
    switch (action.type) {
        case 'USER_LOADING':
            return{
                ...state,
                loading: true
            };
        case 'GET_USER':
            return{
                ...state,
                user: action.payload,
                loading: false
            };
        default:
            return state;
    }
}