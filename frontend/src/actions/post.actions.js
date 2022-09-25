import axios from 'axios';

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";


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