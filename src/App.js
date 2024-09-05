import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import Login from './components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import TawkToWidget from './TalktoWidget';
import CompanyProfile from './components/CompanyProfile';
import ParasDefenceProfile from './components/ParasDefenceProfile';
import WareeProfile from './components/WareeProfile';
import HALProfile from './components/HALProfile';
import ACEProfile from './components/ActionProfile';
import WiproProfile from './components/WiproProfile';
import DashAppLink from './components/DashAppLink';

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
        <Route path="/company/paras" element={<ParasDefenceProfile />} />
        <Route path="/company/waree" element={<WareeProfile />} />
        <Route path="/company/hal" element={<HALProfile />} />
        <Route path="/company/ace" element={<ACEProfile />} />
        <Route path="/company/wipro" element={<WiproProfile />} />
        <Route path="/dashboard" element={<DashAppLink />} />
        </Routes>
      {/* <TawkToWidget /> */}
    </Router>
  );
}

export default App;