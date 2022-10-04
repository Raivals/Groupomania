import React, { useState } from 'react'
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const Log = ( props ) => {
  //affichage conditionnel avec hooks + props
  const [signUpModal, setSignUpModal]  = useState(props.signup); 
  const [signInModal, setSignInModal]  = useState(props.signin); 

  const handleModals = (event) => {
    if (event.target.id === "register") {
        setSignInModal(false);
        setSignUpModal(true);
    } else if (event.target.id === "login") {
        setSignInModal(true);
        setSignUpModal(false);
    }
  }

  // Formulaire  de connexion

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
  );
};

export default Log