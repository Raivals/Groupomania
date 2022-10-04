import axios from "axios";

export const GET_USER ="GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
// Errors
export const GET_USER_ERRORS = "GET_USER_ERRORS"

//récupérer les informations des utilisateurs
export const getUser = (uid) => {
    return (dispatch) => {
      return axios
      ({
        method: "get",
        url: (`${process.env.REACT_APP_API_URL}api/user/${uid}`),
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

//récupère tous ce qui est mis dans data dans UploadImg
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
    ({
      method: "post",
      url:`${process.env.REACT_APP_API_URL}api/user/upload`,
      data: data,
      withCredentials : true,
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type : GET_USER_ERRORS, payload: res.data.errors})
        } else {
          dispatch({ type : GET_USER_ERRORS, payload: ''})
          return axios
          ({
            method: "get",
            url:(`${process.env.REACT_APP_API_URL}api/user/${id}`),
            withCredentials : true,
          })
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            }); 
          } 
      })
      .catch((err) => console.log(err));
  };
};

// Mise à jour bio 

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data:{ bio },
      withCredentials : true,
    })
      .then((res) => {
        dispatch({type: UPDATE_BIO, payload: bio })
      })
      .catch((err) => console.log(err))
  };
};