/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState,useContext} from 'react'
import { modalContext } from '../../App'
import './addbutton.scss'
import { Link } from 'react-router-dom'

const AddButtons = () => {
  const [active, setActive] = useState('#')
  const modal = useContext(modalContext)

  const handleClick =()=>{
    modal.setShowModal(true)
  }

  return (
    <div className='container btn-container'>
            <button className='btn' onClick={handleClick}>Add Quotes</button>
            <div className="category">
              <Link to="/" onClick={() => setActive('/')} className={active === '/' ? 'btn active' : 'btn'} >All Qoutes</Link>
              <Link to="/my" onClick={() => setActive('/my')} className={active === '/my' ? 'btn active' : 'btn'} >My Qoutes</Link>
            </div>
    </div>
  )
}

export default AddButtons