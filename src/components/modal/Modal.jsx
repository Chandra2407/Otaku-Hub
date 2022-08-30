import React, { useState, useContext } from 'react';
import { modalContext } from '../../App';
import { addDoc, collection } from 'firebase/firestore';
import { db, timestamp, storage } from '../../firebase/config';
import './modal.scss';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { spinContext } from '../../App'
import axios from 'axios';


const Modal = ({ isAuth }) => {
    const types = ['image/png', 'image/jpg', 'image/jpeg'];
    const modal = useContext(modalContext);
    const setSpinner = useContext(spinContext)

    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [charName, setCharName] = useState('');
    const [quote, setQuote] = useState('');


    const quotesCollectionRef = collection(db, 'quotes');
    let sfw = true;
    let anime = true;

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

    const createQuote = () => {
        const createdAt = timestamp();
        const imageRef = ref(storage, file.name)

        const uploadTask = uploadBytesResumable(imageRef, file)

        uploadTask.on('state_changed', (snap) => {

        },
            (error) => {
                console.log(error)
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref)
                // check if image is nsfw and anime
                // console.log(isNSFW(url),isAnime(url))
                await isSFW(url)
                await isAnime(url)
                console.log(sfw,anime)
                if (sfw && anime) {
                    try {
                        await addDoc(quotesCollectionRef, {
                            charName,
                            quote,
                            createdAt,
                            url,
                            user: {
                                name: localStorage.getItem('username'),
                                id: localStorage.getItem('uid')
                            },
                            likes: [],
                            comments: []
                        });
                    }
                    catch (error) {
                        console.log(error.message)
                    }
                }
                // delete image from firebase storage
                else {
                    const storageRef = ref(storage, url)
                    await deleteObject(storageRef)
                    alert('bruhh, please upload something decent :|')
                }
            }

        );

    }

    const isSFW = async (url) => {
        try {
            const response = await axios.get(`https://api.imagga.com/v2/categories/nsfw_beta?image_url=${url}`, {
                headers: {
                    "accept": "application/json",
                    "authorization": "Basic YWNjX2YyODQyOGY4NzY4YWMzMzozMWU5MDdhNTA2MzRkMzQzMjY2NjIwYWI0MDVhN2UwNg=="
                }
            })
            const categories = response.data.result.categories;
            for (let i of categories) {
                if (i.name.en === "nsfw" && i.confidence > 20) {
                    console.log('nsfw')
                    sfw = false;
                }
            }
            console.log('sfw')
        } catch (error) {
            console.log(error.message)
        }
    }
    const isAnime = async(url) => {
        try {
            const response = await axios.get(`https://api.imagga.com/v2/categories/personal_photos?image_url=${url}`, {
                headers: {
                    "accept": "application/json",
                    "authorization": "Basic YWNjX2YyODQyOGY4NzY4YWMzMzozMWU5MDdhNTA2MzRkMzQzMjY2NjIwYWI0MDVhN2UwNg=="
                }
            })
            const categories = response.data.result.categories;
            for (let i of categories) {
                if (i.name.en === "paintings art") {
                    console.log('anime')
                    anime = true;
                    return;
                }
            }
            anime = false;
            console.log('not anime')
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!error && isAuth) {
            await setSpinner(true)
            await createQuote()
            await setSpinner(false)
            await modal.setShowModal(false)
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
                        value={charName} onChange={(e) => setCharName(e.target.value)} required />
                    <textarea cols="30" rows="6" placeholder='Add Quote'
                        value={quote} onChange={(e) => setQuote(e.target.value)} required></textarea>
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