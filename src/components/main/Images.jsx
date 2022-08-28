/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import './images.scss'
import { collection, getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Image from './Image'
import { spinContext } from '../../App'
import InfiniteScroll from "react-infinite-scroll-component";

const Images = () => {
    const [quoteList, setQouteList] = useState([]);
    const [last, setLast] = useState(null)
    const [hasMore, sethasMore] = useState(true)
    const setSpinner = useContext(spinContext)

    const quotesCollectionRef = collection(db, 'quotes');
    const q = query(quotesCollectionRef, orderBy('createdAt', 'desc'), limit(15))

    const getPosts = async () => {
        await setSpinner(true)
        const data = await getDocs(q)
        const lastVisible = data.docs[data.docs.length - 1];
        setLast(lastVisible)
        await setQouteList(data.docs.map(doc => {
            return ({ ...doc.data(), id: doc.id })
        }))
        await setSpinner(false)
    };
    useEffect(() => {
        getPosts();
    }, [])

    const fetchMoreData = async () => {
        const next = query(collection(db, "quotes"),
            orderBy("createdAt", "desc"),
            startAfter(last),
            limit(15));
        const data = await getDocs(next);
        const newList = await data.docs.map(doc => {
            return ({ ...doc.data(), id: doc.id })
        })
        // console.log(newList.length)
        if (newList.length === 0) {
            sethasMore(false)
        }
        setQouteList(quoteList.concat(newList))
        const lastVisible = data.docs[data.docs.length - 1];
        setLast(lastVisible)
    }
    return (
        <>
            <InfiniteScroll
                dataLength={quoteList.length}
                next={fetchMoreData}
                hasMore={hasMore}
            >
                <div className='container img-container'>
                    {quoteList.map(quote => {
                        return <Image key={quote.id} quote={quote} />
                    })

                    }
                </div>
            </InfiniteScroll>
        </>
    )
}

export default Images