/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useContext} from 'react'
import './images.scss'
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore'
import { db } from '../../firebase/config'
import Image from './Image'
import { spinContext } from '../../App'

const MyImages = ({isAuth}) => {
    const [quoteList,setQouteList] = useState([]);
    const setSpinner = useContext(spinContext)

    const q = query(collection(db,"quotes"),orderBy('createdAt','desc'),where("user.id","==",localStorage.getItem('uid')))

    useEffect(()=>{
        const getPosts = async()=>{
            await setSpinner(true)
            const data = await getDocs(q)
           await setQouteList(data.docs.map(doc=>{
              return ({...doc.data(),id:doc.id})
            }))
            await setSpinner(false)
        };
        
        getPosts();
    },[])
  return (
    <div className='container img-container'>
    {isAuth ? quoteList.map(quote=> {
        return <Image key={quote.id} quote={quote} deletable={true} />
    }): <h5 style={{textAlign:"center"}}>Login to see your quotes</h5> 
    }
    </div>
  )
}

export default MyImages