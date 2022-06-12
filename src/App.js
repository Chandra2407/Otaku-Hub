import './styles/index.scss';
import React, { useState } from 'react';
import Header from './components/header/Header';
import AddButtons from './components/add-buttons/AddButtons';
import Images from './components/main/Images';
import Modal from './components/modal/Modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
// import {getRedirectResult} from 'firebase/auth'
// import { auth } from './firebase/config';
import MyImages from './components/main/MyImages';
import Spinner from './components/spinner/Spinner';


export const modalContext = React.createContext();
export const spinContext = React.createContext();


function App() {
  const [showModal, setShowModal] = useState(false)
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

  const [showSpin, setShowSpin] = useState(false)
  // getRedirectResult(auth).then(result=>{
  //   console.log(result)
  // }).catch(error=>{
  //   console.log(error)
  // })

  return (
    <div className="App">
      <Router>
        <spinContext.Provider value={setShowSpin}>
          <Header setIsAuth={setIsAuth} isAuth={isAuth} />
          <modalContext.Provider value={{ showModal: showModal, setShowModal: setShowModal }}>
            <AddButtons isAuth={isAuth} />
            {showModal && <Modal isAuth={isAuth} />}
          </modalContext.Provider>
          <Routes>
            <Route exact path='/' element={<Images />} />
            <Route exact path='/my' element={<MyImages isAuth={isAuth} />} />
            <Route exact path='/login' element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </spinContext.Provider>
      </Router>
      {showSpin && <Spinner />}
    </div>
  );
}

export default App;
