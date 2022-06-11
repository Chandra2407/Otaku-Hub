import React from 'react'

const Image = ({quote}) => {
  return (
    <div className="img-cont">
    <div className="user-name">
        <p><i>@{quote.user.name}</i></p>
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