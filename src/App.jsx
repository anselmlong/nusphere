import './App.css';
// pages
import LandingPage from './pages/LandingPage';
import UpcomingEvents from './pages/UpcomingEvents';
import MyEvents from './pages/MyEvents';
import PostEvent from './pages/PostEvent';
import EventDetails from './components/EventDetails';
import ResponsiveAppBar from './components/NavigationBar/Nav';
import Bookmarks from './pages/Bookmarks';
import Login from './pages/Login';
import Register from './pages/Register';
// google stuff
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// React stuff
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SearchResults from './pages/SearchResults';
import Category from './components/Category';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RequireAuth from './components/RequireAuth.js';
import useAuth from './hooks/useAuth.js';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const { setAuth } = useAuth();


  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };
  // create a log in useEffect from a non-google log in
  // and set the profile array to the response data.
  {/**
  const login = (email, password) => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users-login", { email, password })
      .then((res) => {
        if (res) {
          setProfile(res);
          console.log(res);
          console.log('User successfully logged in:', res.name);
        } else {
          console.log('Response data is undefined');
        }
      })
      .catch((err) => console.log(err));
  }
  */}


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
            setAuth(res.data);
            console.log(res.data);
            axios.post(process.env.REACT_APP_BACKEND_URL + "/google-users", {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ResponsiveAppBar profile={profile} login={googleLogin} logOut={logOut} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="All" element={<LandingPage />} />
        <Route path="Upcoming" element={<UpcomingEvents />} />
        <Route path="categories/:category" element={<Category />} />
        <Route path="SearchResults" element={<SearchResults />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="Login" element={<Login googleLogin={googleLogin} profile={profile} setProfile={setProfile} />} />
        <Route path="Register" element={<Register googleLogin={googleLogin} />} />

        {/** Required to log in */}
        <Route element={<RequireAuth />}>
          <Route path="My-Events" element={<MyEvents profile={profile} />} />
          <Route path="PostEvent" element={<PostEvent />} />
          <Route path="Bookmarks" element={<Bookmarks />} />
        </Route>
        {/** Catch all */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
