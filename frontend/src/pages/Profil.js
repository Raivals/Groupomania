import React, { useContext } from 'react'
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
// affichage image pb avec svg ?
import image from '../assets/img/login.jpg'
const Profil = () => {
// Obteniir l'id utilisateur si celui ci est connecté
const uid = useContext(UidContext);

  return (
    <div className='profil-page'>
    {uid ? (
      <h1>UPDATE PAGE</h1>
    ) : (

      <div className='log-container'>
        <Log signin={false} signup={true} />
        <div className='img-container'>
          <img src={image} alt='img-log'/> 
        </div>
      </div>
    )} 
    </div>
  )
}

export default Profil
