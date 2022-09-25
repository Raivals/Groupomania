import axios from 'axios';

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST ="LIKE_POST"
export const UNLIKE_POST ="UNLIKE_POST"


export const getPosts = () => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post/`,
            withCredentials : true,
        })
        .then((res) => {
            dispatch({ type: GET_POSTS, payload: res.data })
        })
        .catch((err) => console.log(err))
    };
};

export const addPost = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/post/`,
            data: data,
            withCredentials : true,
        })
    };
}

// Like / unlike

export const likePost = (postId, userId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/like-post` + postId,
        data: { id: userId },
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: LIKE_POST, payload: { postId, userId } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const unlikePost = (postId, userId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/unlike-post` + postId,
        data: { id: userId },
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        })
        .catch((err) => console.log(err));
    };
  };