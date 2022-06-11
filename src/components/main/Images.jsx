/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import './images.scss'
import {collection, getDocs, orderBy, query} from 'firebase/firestore'
import { db } from '../../firebase/config'
import Image from './Image'


const Images = () => {
    const [quoteList,setQouteList] = useState([]);
    const quotesCollectionRef = collection(db,'quotes');
    const q = query(quotesCollectionRef,orderBy('createdAt','desc'))

    useEffect(()=>{
        const getPosts = async()=>{
            const data = await getDocs(q)
           await setQouteList(data.docs.map(doc=>{
              return ({...doc.data(),id:doc.id})
            }))
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