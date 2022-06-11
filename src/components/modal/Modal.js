import React, { useState, useContext } from 'react';
import { modalContext } from '../../App';
import {addDoc, collection} from 'firebase/firestore';
import { db,timestamp,storage } from '../../firebase/config';
import './modal.scss';
import {getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage';


const Modal = ({isAuth}) => {
    const types = ['image/png', 'image/jpg', 'image/jpeg'];
    const modal = useContext(modalContext);

    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [charName,setCharName] = useState('');
    const [quote,setQuote] = useState('');


    const quotesCollectionRef = collection(db,'quotes');

    const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError(null)
        }
        else {
            setError('Please select png or jpg files');
            setFile(null)
        }
    }

    const handleClick = () => {
        modal.setShowModal(false)
    }

    const createQuote = ()=>{
        const createdAt = timestamp();
        const imageRef =  ref(storage,file.name)
        
        const uploadTask = uploadBytesResumable(imageRef,file)

        uploadTask.on('state_changed',(snap)=>{

        },
        (error)=>{
            console.log(error)
        },
        async()=>{
          const url =  await getDownloadURL(uploadTask.snapshot.ref)
          try{
            await addDoc(quotesCollectionRef,{
                charName,
                quote,
                createdAt,
                url,
                user:{
                    name:localStorage.getItem('username'),
                    id:localStorage.getItem('uid')
                }
            });
        }
        catch(error){
            console.log(error.message)
        }
        }
        
        );

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!error && isAuth)
        {
            createQuote()
            modal.setShowModal(false)
        }
    }
    return (
        <div className='modal-bg'>
            <div className="modal-pop">
                <form action="" onSubmit={handleSubmit}>
                    <label>
                        <input type="file" required onChange={handleChange} />
                        <span>Add Image</span>
                    </label>
                    <div className='output'>
                        {error && <div className='error'>{error}</div>}
                        {file && <div> {file.name}</div>}
                    </div>
                    <input type="text" placeholder='Chanracter name'
                     value={charName} onChange={(e)=>setCharName(e.target.value)} required />
                    <textarea cols="30" rows="6" placeholder='Add Quote'
                     value={quote} onChange={(e)=>setQuote(e.target.value)} required></textarea>
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