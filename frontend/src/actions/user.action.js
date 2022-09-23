import axios from "axios";

export const GET_USER ="Get_USER";


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