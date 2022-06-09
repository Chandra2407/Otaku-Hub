import React,{useState,useContext} from 'react'
import { modalContext } from '../../App';
import './modal.scss'

const Modal = () => {
    const types = ['image/png','image/jpg','image/jpeg'];
    const [file,setFile] = useState(null);
    const [error,setError] = useState(null);
    const modal = useContext(modalContext)

    const handleChange = (e)=>{
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)){
            setFile(selected)
            setError(null)
        }
        else{
            setError('Please select png or jpg files');
            setFile(null)
        }
    }

    const handleClick = ()=>{
        modal.setShowModal(false)
    }
    const handleSubmit = (e)=>{
        modal.setShowModal(false)
    }
  return (
    <div className='modal-bg'>
        <div className="modal-pop">
        <form action="" onSubmit={handleSubmit}>
        <label>
        <input type="file" required onChange={handleChange}/>
        <span>Add Image</span>
        </label>
        <div className='output'>
        {error && <div className='error'>{error}</div>}
        {file && <div> {file.name}</div>}
        </div>
        <textarea cols="30" rows="10" placeholder='Add Quote' required></textarea>
        <div className="buttons">
        <button className='btn' type='submit'>Add Quote</button>
        <button className='btn' onClick={handleClick}>Cancel</button>
        </div>
        </form>
        </div>
    </div>
  )
}

export default Modal