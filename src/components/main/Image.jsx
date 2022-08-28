import { deleteDoc, doc,updateDoc,arrayRemove,arrayUnion,collection,onSnapshot } from 'firebase/firestore'
import React,{useState} from 'react'
import { db, storage } from '../../firebase/config'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { ref,deleteObject } from 'firebase/storage';

const Image = ({ quote, deletable }) => {
  const isAuth = localStorage.getItem('isAuth');
  const likesRef  = doc(db,'quotes',quote.id)
  const [liked,setLiked] = useState(quote.likes?.includes(localStorage.getItem('uid')))
  const [likeCount,setLikeCount] = useState(quote.likes?.length) 

  const deletePost = async (id,url) => {
    const quoteDoc = doc(db, 'quotes', id)
    await deleteDoc(quoteDoc)
    const storageRef = ref(storage,url)
    await deleteObject(storageRef)

  }

//   const unsub = onSnapshot(doc(db, 'quotes',quote.id), (doc) => {
//     console.log("Current data: ", doc.data());
// });

  const handleLike = ()=>{
      updateDoc(likesRef,{
        likes:arrayRemove(localStorage.getItem('uid'))
      }).then(()=>{
        // console.log('unliked')
        setLiked(false)
        setLikeCount(likeCount-1)
      }).catch(error=>{
        console.log(error)
      })
  }

  const handleDislike = ()=>{
    updateDoc(likesRef,{
      likes:arrayUnion(localStorage.getItem('uid'))
    }).then(()=>{
      // console.log('liked')
      setLiked(true)
      setLikeCount(likeCount+1)
    }).catch(error=>{
      console.log(error)
    })
  
  }

  return (
    <div className="img-cont">
      <div className="user-name">
        <p><i>@{quote.user.name}</i></p>
        {deletable && <button onClick={() => deletePost(quote.id,quote.url)}>{" "}&#128465;</button>}
      </div>
      <div className="img">
        <img src={quote.url} alt="" />
      </div>
      <div className="quote">
        <p>"{quote.quote}" <br />-{quote.charName}</p>
      </div>
      <div className="like-cont">
        {
          liked?
          <button className='like-btn' disabled={isAuth?false:true} onClick={handleLike} > <FcLike /></button>: 
          <button onClick={handleDislike} className='like-btn' disabled={isAuth?false:true} > <FcLikePlaceholder /></button>
        }  
        <div className="like-count">
          <p>{likeCount} Likes</p>
        </div>
      </div>
    </div>
  )
}

export default Image