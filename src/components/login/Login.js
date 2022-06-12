import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase/config'
import {signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import './login.scss'
import { spinContext } from '../../App'

const Login = ({setIsAuth}) => {
    const[signUp,setSignUp] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassowrd] = useState('')
    const [error,setError] = useState(false)
    let navigate = useNavigate()
    const setSpinner = useContext(spinContext)
    
    const setUser =async(result)=>{
      await localStorage.setItem('isAuth',true)
      await localStorage.setItem('uid',result.user.uid)
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
    }

    const handleClick = (e)=>{
        e.preventDefault()
        signInWithPopup(auth,provider).then((result)=>{
           setUser(result);

        }).catch(error=>{
          console.log(error)
          setError(true)
        })
  } 
  // const redirect = ()=>{
  //   signInWithRedirect(auth,provider)
  // }

  const handleSubmit = async(e)=>{
      e.preventDefault()
      await setSpinner(true)
      if(signUp){
       await createUserWithEmailAndPassword(auth,email,password)
        .then(async(result)=>{
         setUser(result)
        })
        .catch((err)=>{
          console.log(err.message)
          setError(true)
        })
        
      }
      else{
       await signInWithEmailAndPassword(auth,email,password)
        .then(async(result)=>{
          setUser(result)
        })
        .catch(err=>{
          console.log(err.message)
          setError(true)
        })
      }
      await setSpinner(false)
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
          <button className='btn login-btns' id='signin' onClick={handleClick}>Sign in with Google</button>
          <button className='btn login-btns' id='signincancel' onClick={handleCancel}>Cancel</button>
      </form>
        <button className='already' onClick={()=>setSignUp(!signUp)}>{!signUp?`Don't`:'Already'} have an account?</button>
    </div>
</div>
  )
}

export default Login