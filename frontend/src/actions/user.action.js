import axios from "axios";

export const GET_USER ="GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";


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
          return axios
          ({
            method: "get",
            url:(`${process.env.REACT_APP_API_URL}api/user/${id}`),
            withCredentials : true,
          })
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });  
      })
      .catch((err) => console.log(err));
  };
};

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