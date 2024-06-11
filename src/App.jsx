import './App.css';
// pages
import LandingPage from './pages/LandingPage';
import UpcomingEvents from './pages/UpcomingEvents';
import MyEvents from './pages/MyEvents';
import Profile from './pages/Profile';
import PostEvent from './pages/PostEvent';
import EventDetails from './pages/EventDetails';
import ResponsiveAppBar from './components/Nav';
// google stuff
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// React stuff
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Academic from './pages/categories/Academic';
import Sports from './pages/categories/Sports';
import Social from './pages/categories/Social';
import Career from './pages/categories/Career';
import SearchResults from './pages/SearchResults';

// Google client ID
const CLIENT_ID = "752550756966-kgm3afqg199bjpi4mec0hq02tg875i97.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  // don't touch this
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
        <Route path="PostEvent" element={<PostEvent />} />
        <Route path="Academic" element={<Academic />} />
        <Route path="Career" element={<Career />} />
        <Route path="Social" element={<Social />} />
        <Route path="Sports" element={<Sports />} />
        <Route path="SearchResults" element={<SearchResults />} />
        <Route path="events/:id" element={<EventDetails />} />
      </Routes>
    </div>
  );
}

export default App;
