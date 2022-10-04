import axios from "axios";

export const GET_USER ="GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
// Errors
export const GET_USER_ERRORS = "GET_USER_ERRORS"

/**
 * récupérer les informations des utilisateurs
 * 
 * si tout se passe bien, récuperer les infos via appel API méthode get
 * @param {*} uid 
 * @returns Si il y a une erreur, catch l'erreur et log l'erreur en question.
 */
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

/**
 * Permet d'upload une image pour afficher la photo de profil
 * 
 * si tout se passe bien, upload l'image via appel API méthode post
 * @param {*} data 
 * @param {*} id 
 * @returns Si il y a une erreur, catch l'erreur et log l'erreur en question.
 */
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

/**
 * Mise à jour de la biographie d'un utilisateur 
 * 
 * si tout se passe bien, mettre à jour la bio via appel API méthode put
 * @param {*} userId 
 * @param {*} bio 
 * @returns Si il y a une erreur, catch l'erreur et log l'erreur en question.
 */

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