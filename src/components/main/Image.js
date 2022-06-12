import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase/config'

const Image = ({quote,deletable}) => {

  const deletePost = async(id)=>{
    const quoteDoc = doc(db,'quotes',id)
    await deleteDoc(quoteDoc)

  }
  return (
    <div className="img-cont">
    <div className="user-name">
        <p><i>@{quote.user.name}</i></p>
        {deletable && <button onClick={()=>deletePost(quote.id)}>{" "}&#128465;</button>}
    </div>
    <div className="img">
        <img src={quote.url} alt="" />
    </div>
    <div className="quote">
        <p>"{quote.quote}" <br />-{quote.charName}</p>
    </div>
</div>
  )
}

export default Image