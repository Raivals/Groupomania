import React, { useState } from 'react'
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const Log = () => {
  const [signUpModal, setSignUpModal]  = useState(true); 
  const [signInModal, setSignInModal]  = useState(false); 

  const handleModals = (event) => {
    if (event.target.id === "register") {
        setSignInModal(false);
        setSignUpModal(true);
    } else if (event.target.id === "login") {
        setSignInModal(true);
        setSignUpModal(false);
    }
  }

  return (
    <div className='connection-form'>
        <div className='form-container'>
            <ul>
                <li 
                    onClick={handleModals} 
                    id="register" 
                    className={signUpModal ? "active-btn" : null}
                    >
                    S'inscrire
                </li>
                <li 
                    onClick={handleModals} 
                    id="login" 
                    className={signInModal ? "active-btn" : null}
                    >
                    Se connecter
                </li>
            </ul>
            {signUpModal && <SignupForm />}
            {signInModal && <SigninForm />}
        </div>
    </div>
  )
}

export default Log