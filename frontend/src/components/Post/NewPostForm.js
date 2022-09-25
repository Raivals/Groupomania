import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils';
import {  FaSpinner } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);      
  const [video, setVideo] = useState('');
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
 
  const handlePicture = () => {

  };

  const handlePost = () => {

  };

  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setVideo('');
    setFile('');
  };


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
                {message || postPicture || video.length > 20 ? (
                    <li className='card-container'>
                        <div className='card-left'>
                            <img src={userData.picture} alt='user-pic'/>
                        </div>
                        <div className='card-right'>
                            <div className='card-header'>
                                <div className='pseudo'>
                                   <h3>{userData.pseudo}</h3> 
                                </div>
                                <span>{timestampParser(Date.now())}</span>
                            </div>
                            <div className='content'>
                               <p>{message}</p> 
                               <img src={postPicture} alt='postimg'/>
                               {video && (
                                <iframe
                                    src={video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={video}
                                ></iframe>
                               )}
                            </div>
                        </div>
                    </li>
                ) : null}
                <div className='footer-form'>
                    <div className='icon'>
                        {isEmpty(video) && (
                            <>
                                <img src='./img/icons/picture.svg' alt='img'/>
                                <input 
                                    type="file" 
                                    id='file-upload' 
                                    name='file' 
                                    accept='.jpg, .jpeg, .png' 
                                    onChange={(e) => handlePicture(e)}
                                />
                            </>
                        )}
                        {video && (
                            <button onClick={() => setVideo("")}>Supprimer video</button>
                        )}
                    </div>
                    <div className='btn-send'>
                    {/* afficher uniquement "annuler message" si un post est déjà en train d'être créé */}
                    {message || postPicture || video.length > 20 ? (
                        <button className='cancel' onClick={cancelPost}>Annuler message</button>
                    ) : null}
                        <button className='send' onClick={handlePost}>Envoyer</button>
                    </div>
                </div>
            </div>
           </>
        )}
    </div>
  );
};

export default NewPostForm