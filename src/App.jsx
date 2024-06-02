import './App.css';
import LandingPage from './components/LandingPage';
import UpcomingEvents from './pages/UpcomingEvents';
import MyEvents from './pages/MyEvents';
import Profile from './pages/Profile';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import ResponsiveAppBar from './components/Nav';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

const CLIENT_ID = "752550756966-kgm3afqg199bjpi4mec0hq02tg875i97.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };


  return (
    <div>
      
      <ResponsiveAppBar profile={profile} login={login} logOut={logOut} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="All" element={<LandingPage />} /> 
        <Route path="Upcoming" element={<UpcomingEvents />} />
        <Route path="My Events" element={<MyEvents />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
      {/*<div className='login'>
        {profile ?  <Avatar alt="user image" src={profile.picture} />
            <p>{profile.name}</p>
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
      </div> */}

    </div>
  );
}

export default App;
