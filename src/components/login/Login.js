import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase/config'
import {signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import './login.scss'

const Login = ({setIsAuth}) => {
    const[signUp,setSignUp] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassowrd] = useState('')
    const [error,setError] = useState(false)
    let navigate = useNavigate()

    const handleClick = (e)=>{
        e.preventDefault()
        signInWithPopup(auth,provider).then(async(result)=>{
            await localStorage.setItem('isAuth',true)
            await setIsAuth(true)
            if(result.user.displayName){
              localStorage.setItem('username',result.user.displayName)
            }
            else{
              let username = result.user.email.substring(0,result.user.email.indexOf('@'))
              localStorage.setItem('username',username)
            }
            if(localStorage.getItem('isAuth')) navigate('/')
            setError(false)
        }).catch(error=>{
          console.log(error)
          setError(true)
        })
  } 
  // const redirect = ()=>{
  //   signInWithRedirect(auth,provider)
  // }

  const handleSubmit = (e)=>{
      e.preventDefault()
      if(signUp){
        createUserWithEmailAndPassword(auth,email,password)
        .then(async(result)=>{
          await localStorage.setItem('isAuth',true)
          await setIsAuth(true)
          if(result.user.displayName){
            localStorage.setItem('username',result.user.displayName)
          }
          else{
            let username = result.user.email.substring(0,result.user.email.indexOf('@'))
            localStorage.setItem('username',username)
          }
          if(localStorage.getItem('isAuth')) navigate('/')
          setError(false)
        })
        .catch((err)=>{
          console.log(err.message)
          setError(true)
        })
        
      }
      else{
        signInWithEmailAndPassword(auth,email,password)
        .then(async(result)=>{
          await localStorage.setItem('isAuth',true)
          await setIsAuth(true)
          if(result.user.displayName){
            localStorage.setItem('username',result.user.displayName)
          }
          else{
            let username = result.user.email.substring(0,result.user.email.indexOf('@'))
            localStorage.setItem('username',username)
          }
          if(localStorage.getItem('isAuth')) navigate('/')
          setError(false)
        })
        .catch(err=>{
          console.log(err.message)
          setError(true)
        })
      }
      setEmail('')
      setPassowrd('')
  }
  const handleCancel = ()=>{
    navigate('/');
  }
  return (
    <div className='modal-bg'>
    <div className="modal-pop">
    <form action="" className='login-form' onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={((e)=>setEmail(e.target.value))} required placeholder='Enter email' />
          <input type="password" value={password} onChange={((e)=>setPassowrd(e.target.value))} minLength={6} required placeholder='Enter Password'/>
          <p className='error'>{error?'invalid email or password':''}</p>
          <button type='submit' className='btn login-btns'>{!signUp?'Sign in':'Sign up'}</button>
          <p>Or</p>
          <p>Sign in with Google to continue</p>
          <button className='btn login-btns' id='signin' onClick={handleClick}>Sign in with Google</button>
          <button className='btn login-btns' id='signincancel' onClick={handleCancel}>Cancel</button>
      </form>
        <button className='already' onClick={()=>setSignUp(!signUp)}>{!signUp?`Don't`:'Already'} have an account?</button>
    </div>
</div>
  )
}

export default Login