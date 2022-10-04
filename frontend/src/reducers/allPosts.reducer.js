import { GET_ALL_POSTS } from "../actions/post.actions";

// Reducer de tous les posts
const initialState = {};

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload
    default: 
      return state;
  }
}