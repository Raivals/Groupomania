import React from 'react'
import { NavLink } from 'react-router-dom';
import image from '../assets/img/icons/logo.jpg';

const  Navbar = () => {
  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
         <NavLink exact to='/'>
          <div className='logo'>
            <img src={image} alt='icon'/>
            <h3>Groupomania</h3>
          </div>
         </NavLink> 
        </div>
      </div>
    </nav>
  )
}

export default Navbar