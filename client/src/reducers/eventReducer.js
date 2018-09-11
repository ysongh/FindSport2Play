const initialState = {
    events: [],
    event: [],
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
        case 'GET_EVENT':
            return{
                ...state,
                event: action.payload,
                loading: false
            };
        case 'DELETE_EVENT':
            return{
                ...state,
                events: state.events.filter(event => event._id !== action.payload)
            };
        default:
            return state;
    }
}