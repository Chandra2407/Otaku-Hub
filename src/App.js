import './styles/index.scss';
import React, { useState } from 'react';
import Header from './components/header/Header';
import AddButtons from './components/add-buttons/AddButtons';
import Images from './components/main/Images';
import Modal from './components/modal/Modal';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/login/Login';
// import {getRedirectResult} from 'firebase/auth'
// import { auth } from './firebase/config';

export const modalContext = React.createContext();


function App() {
  const [showModal, setShowModal] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  // getRedirectResult(auth).then(result=>{
  //   console.log(result)
  // }).catch(error=>{
  //   console.log(error)
  // })

  return (
    <div className="App">
    <Router>
      <Header setIsAuth={setIsAuth} isAuth={isAuth}/>
      <modalContext.Provider value={{showModal:showModal,setShowModal:setShowModal}}>
        <AddButtons />
        {showModal && <Modal />}
      </modalContext.Provider>

        <Routes>
          <Route exact path='/' element={<Images />} />
          <Route exact path='/my' element={<Images />} />
          <Route exact path='/login' element={<Login setIsAuth={setIsAuth}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
