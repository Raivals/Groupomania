import axios from 'axios'

// posts
export const GET_POSTS = 'GET_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

// Comments
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// trends
export const GET_TRENDS = 'GET_TRENDS';

// Errors
export const GET_POSTS_ERRORS = 'GET_POSTS_ERRORS';

// Get post réçoit un numéro (pour infinite scroll)
export const getPosts = (num) => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
    })
      .then((res) => {
        const array = res.data.slice(0, num)
        dispatch({ type: GET_POSTS, payload: array })
        dispatch({ type: GET_ALL_POSTS, payload: res.data })
      })
      .catch((err) => console.log(err))
  };
};
// Ajout d'un nouveau post
export const addPost = (data) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      data: data,
      withCredentials: true,
    }).then((res) => {
      if (res.data.errors) {
        dispatch({ type: GET_POSTS_ERRORS, payload: res.data.errors })
      } else {
        dispatch({ type: GET_POSTS_ERRORS, payload: '' })
      }
    });
  };
};

/**
 * Permet à un utilisateur de like un post en récupérant l'url post + l'id de l'utilisateur qui veut like le post.
 *
 * Si tout se passse bien, autoriser le like du post
 * @param {*} postId
 * @param {*} userId
 * @returns si il y a une erreur, catch l'erreur et log l'erreur en question.
 */

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { id: userId },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } })
      })
      .catch((err) => console.log(err))
  };
};

/**
 * Permet à un utilisateur d'unlike un post en récupérant l'url post + l'id de l'utilisateur qui veut unlike le post.
 *
 * Si tout se passse bien, autoriser l'unlike du post
 * @param {*} postId
 * @param {*} userId
 * @returns si il y a une erreur, catch l'erreur et log l'erreur en question.
 */
export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { id: userId },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } })
      })
      .catch((err) => console.log(err))
  };
};

/**
 * Permet à un utilisateur de mettre à jour un post en récupérant l'url post + l'id de l'utilisateur qui veut update le post.
 *
 * Si tout se passse bien, autoriser l'update du post
 * @param {*} postId
 * @param {*} message
 * @returns si il y a une erreur, catch l'erreur et log l'erreur en question.
 */

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } })
      })
      .catch((err) => console.log(err))
  };
};

/**
 * Permet à un utilisateur de supprimer un post en récupérant l'url post + l'id de l'utilisateur qui veut delete le post.
 *
 * Si tout se passse bien, autoriser le delete du post
 * @param {*} postId
 * @returns si il y a une erreur, catch l'erreur et log l'erreur en question.
 */

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } })
      })
      .catch((err) => console.log(err))
  };
};

/**
 * Permet à un utilisateur de commenter un post en récupérant l'url post + les infos de l'utilisateur qui veut commenter le post.
 *
 * Si tout se passse bien, autoriser le delete du post
 * @param {*} postId
 * @param {*} commenterId
 * @param {*} text
 * @param {*} commenterPseudo
 * @returns  si il y a une erreur, catch l'erreur et log l'erreur en question.
 */

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      withCredentials: true,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        //mongoDB à un id unique par post
        dispatch({ type: ADD_COMMENT, payload: { postId } })
      })
      .catch((err) => console.log(err))
  };
};

/**
 * Permet à un utilisateur de modifier un commentaire en récupérant l'id du post, l'id du commentaire + les infos de l'utilisateur qui veut éditer le commentaire.
 *
 * Si tout se passse bien, autoriser l'édition du commentaire
 * @param {*} postId
 * @param {*} commentId
 * @param {*} text
 * @returns si il y a une erreur, catch l'erreur et log l'erreur en question.
 */

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
      withCredentials: true,
      data: { commentId, text },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } })
      })
      .catch((err) => console.log(err))
  };
};

/**
 * Permet à un utilisateur de supprimer un commentaire en récupérant l'id du post, l'id du commentaire + les infos de l'utilisateur qui veut supprimer le commentaire.
 *
 * Si tout se passe bien, autoriser la suppression du commentaire
 * @param {*} postId
 * @param {*} commentId
 * @returns si il y a une erreur, catch l'erreur et log l'erreur en question.
 */

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      withCredentials: true,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } })
      })
      .catch((err) => console.log(err))
  };
};

// Trends
export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray })
  };
};
