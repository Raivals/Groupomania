import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import {  FaSpinner } from 'react-icons/fa';
const Card = ({ post }) => {
  // Tant qu'on a pas la data de la card => icone chargement
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.userReducer);
  //const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData])

  return (
    <li className="card-container" key={post._id}>
        {isLoading ? (
            <FaSpinner />
        ) : (
            <>
                <div className="card-left">
                    <img src={
                        //on map pour aller chercher la photo actuelle de l'utilisateur
                        !isEmpty(usersData[0]) && 
                            usersData.map((user) => {
                                if (user._id === post.posterId) return user.picture;
                                else return null
                            }).join('')
                    }
                    alt="poster-pic"/>
                </div>
                <div className='card-right'>
                    <div className='card-header'>
                        <div className='pseudo'>
                            <h3>
                                {!isEmpty(usersData[0]) && 
                                    usersData
                                        .map((user) => {
                                        if (user._id === post.posterId) return user.pseudo;
                                        else return null
                                    })
                                    .join(" ")
                                }
                            </h3>
                        </div>
                            <span>{dateParser(post.createdAt)}</span>
                    </div>
                    <p>{post.message}</p>
                    {post.picture && (
                        <img src={post.picture} alt='card-pic' className="card-pic" />
                    )}
                    {post.video && (
                        <iframe
                            width="500"
                            height="300"
                            src={post.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={post._id}
                        ></iframe>
                    )}
                    <div className='card-footer'>
                        <div className='comment-icon'>
                            <img src='./img/icons/messsage1.svg' alt='comment' />
                            <span>{post.comment}</span>
                        </div>
                        <h6>Like button</h6>
                        <img src='./img/icons/share.svg' alt='share' />
                    </div>
                </div>
            </>
        )}
    </li>
  );
};

export default Card;