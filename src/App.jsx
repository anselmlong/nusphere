import './App.css';
// pages
import LandingPage from './pages/LandingPage';
import UpcomingEvents from './pages/UpcomingEvents';
import MyEvents from './pages/MyEvents';
import Profile from './pages/Profile';
import PostEvent from './pages/PostEvent';
import EventDetails from './components/EventDetails';
import ResponsiveAppBar from './components/NavigationBar/Nav';
// google stuff
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// React stuff
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SearchResults from './pages/SearchResults';
import Category from './components/Category';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

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




  return (
    <div>
      <ResponsiveAppBar profile={profile} login={login} logOut={logOut} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="All" element={<LandingPage />} />
        <Route path="Upcoming" element={<UpcomingEvents />} />
        <Route path="My Events" element={<MyEvents user={profile}/>} />
        <Route path="Profile" element={<Profile />} />
        <Route path="PostEvent" element={<PostEvent />} />
        <Route path="categories/:category" element={<Category />} />
        <Route path="SearchResults" element={<SearchResults />} />
        <Route path="events/:id" element={<EventDetails />} />
      </Routes>
    </div>
  );
}

export default App;
