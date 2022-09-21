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