import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from '../actions/post.actions';
import { isEmpty } from './Utils';
import  {NavLink } from 'react-router-dom';

const Trends = () => {
  const posts = useSelector((state) => state.allPostReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

// Changer les objets en array pour utiliser sort (trier l'array du plus aimé au moins aimé)
  useEffect(() => {
    // !isEmpty(posts[0] ne fonctionne pas => affiche page blanche sur le site)
    if (!isEmpty(posts)) {
        const postsArr = Object.keys(posts).map((i) => posts[i]);
        let sortedArray = postsArr.sort((a, b) => {
            return b.likers.length - a.likers.length;
        })
        sortedArray.length = 3;
        dispatch(getTrends(sortedArray))
    }

  }, [posts, dispatch])

  return (
    <div>
        <div className='trending-container'>
            <h4>Trending</h4>
            <NavLink>
                <ul>
                    {trendList.length &&
                        trendList.map((post) => {
                            return (
                                <li key={post._id}>
                                    <div>
                                        {post.picture && <img src={post.picture} alt="post-pic" />}
                                        {isEmpty(post.picture) && (
                                            <img src={usersData[0] && usersData.map((user) => {
                                                if (user._id === post.posterId) {
                                                    return user.picture;
                                                } else return null;
                                            })
                                            .join("")
                                        } alt="profil-pic"/>
                                        )}
                                    </div>
                                    <div className='trend-content'>
                                       <p>{post.message}</p> 
                                       <span>Lire</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </NavLink>
        </div>
    </div>
  )
}

export default Trends;