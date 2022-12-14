
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
// Affichage de l'option supprimer
//la props deletecard ne contient que la prosp .id
const DeleteCard = (props)=> {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch (deletePost(props.id))

  return (
      <div onClick={() => {
        if (window.confirm('Voulez-vous supprimer ce Post ?')) {
            deleteQuote();
        }
      }}>
       <img src="./img/icons/trash.svg" alt="trash" />
      </div>
  )
}

export default DeleteCard;