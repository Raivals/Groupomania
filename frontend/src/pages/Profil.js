import React from 'react'
import Log from '../components/Log';
// affichage image ?

const Profil = () => {
  return (
    <div className='profil-apge'>
      <div className='log-container'>
        <Log signin={false} signup={true} />
        <div className='img-container'>
          <img src="./img/login.svg" alt='img-log'/>
        </div>
      </div> 
    </div>
  )
}

export default Profil
