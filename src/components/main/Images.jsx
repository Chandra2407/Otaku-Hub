/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useContext} from 'react'
import './images.scss'
import {collection, getDocs, orderBy, query} from 'firebase/firestore'
import { db } from '../../firebase/config'
import Image from './Image'
import { spinContext } from '../../App'


const Images = () => {
    const [quoteList,setQouteList] = useState([]);
    const setSpinner = useContext(spinContext)

    const quotesCollectionRef = collection(db,'quotes');
    const q = query(quotesCollectionRef,orderBy('createdAt','desc'))

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
        {quoteList.map(quote=> {
            return <Image key={quote.id} quote={quote} />
        })
            
        }
        </div>
    )
}

export default Images