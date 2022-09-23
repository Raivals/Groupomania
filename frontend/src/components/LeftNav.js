import React from 'react';
import { NavLink } from 'react-router-dom';
// exact activeClassName est déprécié => trouver une solution

const LeftNav = () => {
  return (
    <div className='left-nav-container'>
        <div className='icons'>
            <div className='icons-bis'>
                <NavLink to='/' exact activeClassName="active-left-nav">
                    <img src="./img/icons/home.svg" alt='home'/>
                </NavLink>
                <br/>
                <NavLink to='/profil' exact activeClassName="active-left-nav">
                    <img src="./img/icons/user.svg" alt='profil'/>
                </NavLink>
                <br/>
            </div>
        </div>
    </div>
  )
}

export default LeftNav;
