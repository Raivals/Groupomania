import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import {  FaSpinner } from 'react-icons/fa';
import LikeButton from './LikeButton';
import { updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';
import CardComments from './CardComment';
const Card = ({ post }) => {
  // Tant qu'on a pas la data de la card => icone chargement
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.userReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
        dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(true);
  }, [usersData])

  return (
    <li className="card-container" key={post._id}>
        {isLoading ? (
            <FaSpinner icon="fas fa-spinner fa-spin" className="fas fa-spinner fa-spin" />
        ) : (
            <>
                <div className="card-left">
                {/* problème d'affichage de l'image dans le feed d'actualité */}
                    <img
                        src={
                            !isEmpty(usersData[0]) &&
                            usersData
                            .map((user) => {
                                if (user._id === post.posterId) return user.picture;
                                else return null;
                            })
                            .join("")
                        }
                        alt="poster-pic"
                    />
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
                    {isUpdated === false && <p>{post.message}</p>}
                    {isUpdated && (
                        <div className='update-post'> 
                            <textarea
                                defaultValue={post.message}
                                onChange={(e) => setTextUpdate(e.target.value)}
                            />
                            <div className='button-container'>
                                <button className='btn' onClick={updateItem}>
                                    Valider modification
                                </button>
                            </div>
                        </div>    
                    )}
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
                    {userData._id === post.posterId && userData.admin === false && (
                        <div className="button-container">
                            <div onClick={() => setIsUpdated(!isUpdated/* permet lors du click d'avoir le btn et de l'enlever*/)}>
                                <img src="./img/icons/edit.svg" alt="edit"/>
                            </div>
                            <DeleteCard id={post._id} />
                        </div>
                    )}

                    {userData.admin  === true &&(
                        <div className="button-container">
                            <div onClick={() => setIsUpdated(!isUpdated/* permet lors du click d'avoir le btn et de l'enlever*/)}>
                                <img src="./img/icons/edit.svg" alt="edit"/>
                            </div>
                            <DeleteCard id={post._id} />
                        </div>
                    )}
                    <div className='card-footer'>
                        <div className='comment-icon'>
                            <img 
                                onClick={() => setShowComments(!showComments)} 
                                src='./img/icons/message1.svg' 
                                alt='comment' 
                            />
                            <span>{post.comments.length}</span>
                        </div>
                        <LikeButton post={post} />
                        <img src='./img/icons/share.svg' alt='share' />
                    </div>
                    {showComments && <CardComments post={post} />}
                </div>
            </>
        )}
    </li>
  );
};

export default Card;