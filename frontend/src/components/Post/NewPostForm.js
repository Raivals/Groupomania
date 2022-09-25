import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import {  FaSpinner } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);      
  const [video, setVideo] = useState('');
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
 
 useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]) 

  return (
    <div className='post-container'>
        {isLoading ? (
            <FaSpinner icon="fas fa-spinner fa-pulse" className='fas fa-spinner fa-pulse'/>
        ) : (
           <>
            <NavLink exact to='/profil'> 
                <div className='user-info'>
                    <img src={userData.picture} alt='user-img' />
                </div>
            </NavLink>
            <div className='post-form'>
                <textarea 
                  name='message'
                  id='message'
                  placeholder='Quoi de neuf ?'
                  onChange={(e) => setMessage(e.target.value)}
                  value={message} 
                />
            </div>
           </>
        )}
    </div>
  );
};

export default NewPostForm