/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase/config';

const Header = ({setIsAuth}) => {

  const logout = ()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }
  return (
    <div className='header'>
            <h3>Otaku-Hub</h3>
            <div className="header-right">
              {!localStorage.getItem('isAuth')?<Link to='/login' className='login'>Login</Link>:<><button className='logout' onClick={logout}>logout</button><a href='#' className='logout'>{localStorage.getItem('username')}</a></>}
            </div>

            
    </div>
  )
}

export default Header