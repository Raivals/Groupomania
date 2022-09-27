import { GET_POSTS_ERRORS } from "../actions/post.actions";

const initialState = { postError : []};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS_ERRORS:
            return {
                postError: action.payload,
                setError: []
            }
        default:
            return state;
    };
};