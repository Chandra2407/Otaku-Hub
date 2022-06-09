import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase/config'
import {signInWithPopup} from 'firebase/auth'
import './login.scss'

const Login = ({setIsAuth}) => {
    let navigate = useNavigate()
    const handleClick = (e)=>{
        e.preventDefault()
        signInWithPopup(auth,provider).then(async(result)=>{
            await localStorage.setItem('isAuth',true)
            await setIsAuth(true)
            localStorage.setItem('username',result.user.displayName)
            if(localStorage.getItem('isAuth')) navigate('/')
        }).catch(error=>{
          console.log(error)
        })
        // signInWithRedirect(auth,provider).then(result=>{

        // })
        
  } 
  const handleCancel = ()=>{
    navigate('/');
  }
  return (
    <div className='modal-bg'>
    <div className="modal-pop">
    <form action="">
         <p>Sign in with Google to continue</p>
        <button className='btn' id='signin' onClick={handleClick}>Sign in with Google</button>
        <button className='btn' id='signincancel' onClick={handleCancel}>Cancel</button>
    </form>
    </div>
</div>
  )
}

export default Login