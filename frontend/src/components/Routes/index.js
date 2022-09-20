import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';


const index = () => {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element= {<Home />} />
            <Route exact path="/Profil" element= {<Profil />} />
        </Routes>
    </Router>
  )
}

export default index