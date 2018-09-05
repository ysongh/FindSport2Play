const initialState = {
    events: null,
    loading: false
};

export default function(state = initialState, action){
    switch (action.type) {
        case 'EVENT_LOADING':
            return{
                ...state,
                loading: true
            };
        case 'GET_EVENTS':
            return{
                ...state,
                events: action.payload,
                loading: false
            };
        default:
            return state;
    }
}