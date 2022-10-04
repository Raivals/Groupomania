import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.action";

const UploadImg = () => {
  
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  //on récupère dans le store toute la userData
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    //append pour ajouter du  contenu dans un tableau
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
//dispatch pour dispatcher une action , un changement d'état (redux)
    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;