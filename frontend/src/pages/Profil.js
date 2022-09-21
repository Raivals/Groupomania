import React from 'react'
import Log from '../components/Log';
// affichage image ?
import image from '../assets/img/login.jpg'
const Profil = () => {
  return (
    <div className='profil-page'>
      <div className='log-container'>
        <Log signin={false} signup={true} />
        <div className='img-container'>
          <img src={image} alt='img-log'/> 
        </div>
      </div> 
    </div>
  )
}

export default Profil
