import './App.css';
// pages
import LandingPage from './pages/LandingPage';
import UpcomingEvents from './pages/UpcomingEvents';
import MyEvents from './pages/MyEvents';
import PostEvent from './pages/PostEvent';
import EventDetails from './components/EventDetails';
import ResponsiveAppBar from './components/NavigationBar/Nav';
import Bookmarks from './pages/Bookmarks';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
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
              Authorization: `Bearer ${user.id_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            axios.post('http://localhost:8080/google-users', {
              google_id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              token: user.id_token
            })
            .then((res) => {
              console.log('User successfully logged in with Google:', res.data);
            })
            .catch((err) => {
              console.log('Error posting Google user data:', err);
            });
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
        <Route path="My-Events" element={<MyEvents profile={profile}/>} />
        <Route path="PostEvent" element={<PostEvent />} />
        <Route path="categories/:category" element={<Category />} />
        <Route path="SearchResults" element={<SearchResults />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="Bookmarks" element={<Bookmarks />} />
        <Route path="SignIn" element={<SignIn login={login} />} />
        <Route path="SignUp" element={<SignUp login={login} />} />
      </Routes>
    </div>
  );
}

export default App;
