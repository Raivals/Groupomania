import React, { useEffect, useState } from 'react'
import { getPosts } from '../actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from "./Utils";
import Card from './Post/Card';

// Détail du infinite scroll 

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  
  // Savoir si on se trouve en bas de page
  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
      setLoadPost(true);      
    }
  }
  // Lorsqu'on arrive en bas de la page, charger 5 posts supplémentaires.
  useEffect(() => {
    if (loadPost) {
        dispatch(getPosts(count));
        setLoadPost(false); 
        setCount(count + 5);             
    }

    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost, count, dispatch]);

  return (
    <div className='thread-container'>
        <ul>
            {!isEmpty(posts[0]) &&
                posts.map((post) => {
                    return <Card post={post} key={post._id} />;
                })
            }
        </ul>
    </div>
  );
};

export default Thread