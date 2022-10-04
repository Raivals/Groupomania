import React, { useContext } from 'react'
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import image from '../assets/img/login.jpg'
import UpdateProfil from '../components/Profil/UpdateProfil';

// Structure de la page Profil

const Profil = () => {
// Obteniir l'id utilisateur si celui ci est connecté
const uid = useContext(UidContext);

  return (
    <div className='profil-page'>
    {uid ? (
      <UpdateProfil />
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
