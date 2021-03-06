/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useContext} from 'react';
import './header.scss';
import { Link,useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase/config';
import { spinContext } from '../../App'

const Header = ({setIsAuth}) => {
  const setSpinner = useContext(spinContext)
  const navigate = useNavigate();

  const logout = async()=>{
    await setSpinner(true)
    await signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false)
      navigate('/')
    })
    .catch((err)=>{
      console.log(err.message)
    })
    await setSpinner(false)
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