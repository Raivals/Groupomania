import React, { useState } from 'react'
// Pour requêtes http
import axios from 'axios';

const SigninForm = () => {
  // Hook useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Partie logique communication avec le Back
  const handleLogin = (event) => {
    // Ne pas rechargert  la page
    event.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          // considéré comme connecté
          window.location = '/';
        }
      })
      .catch((err) => {
      console.log(err)
      });
  };
  return (
    <form action='' onSubmit={handleLogin} id="ssign-up-form">
      <label htmlFor='email'>Email</label>
      <br/>
      <input 
      type="text" 
      name='email' 
      id='email' 
      onChange={(event) => setEmail(event.target.value)} 
      value={email} 
      />
      <div className='email error'></div>
      <br/>
      <label htmlFor='password'>Mot de passe</label>
      <br/>
      <input 
      type="password" 
      name="password" 
      id="password"
      onChange={(event) => setPassword(event.target.value)} 
      value={password} 
      />
      <div className='password error'></div>
      <br/>
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SigninForm