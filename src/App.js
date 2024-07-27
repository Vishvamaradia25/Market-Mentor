import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import Login from './components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import TawkToWidget from './TalktoWidget';
import CompanyProfile from './components/CompanyProfile';

const auth = getAuth(app);

function App() {

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        console.log('User logged in:', user);
      }
      else{
        console.log('User logged out');
      }
    }
    );
  }
  , []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/company/:symbol" element={<CompanyProfile />} />
        </Routes>
      {/* <TawkToWidget /> */}
    </Router>
  );
}

export default App;