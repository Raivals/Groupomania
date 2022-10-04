import { GET_TRENDS } from "../actions/post.actions";

// Récupération des trends

const initialState = {};

export default function trendingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS:
            return action.payload;
        default:
            return state;
    };
};