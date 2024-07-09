import './App.css';
// pages
import LandingPage from './pages/LandingPage';
import UpcomingEvents from './pages/UpcomingEvents';
import MyEvents from './pages/MyEvents';
import PostEvent from './pages/PostEvent';
import EditEvent from './pages/EditEvent';
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const login = (email, password) => {
    axios
      .post('http://localhost:8080/users-login', { email, password })
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

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };
  // create a log in useEffect from a non-google log in
  // and set the profile array to the response data.


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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
    <div>
        <ResponsiveAppBar profile={profile} login={googleLogin} logOut={logOut} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="All" element={<LandingPage />} />
          <Route path="Upcoming" element={<UpcomingEvents />} />
          <Route path="My-Events" element={<MyEvents profile={profile} />} />
          <Route path="PostEvent" element={<PostEvent />} />
          <Route path="EditEvent" element={<EditEvent />} />
          <Route path="categories/:category" element={<Category />} />
          <Route path="SearchResults" element={<SearchResults />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="Bookmarks" element={<Bookmarks />} />
          <Route path="SignIn" element={<SignIn googleLogin={googleLogin} login={login} />} />
          <Route path="SignUp" element={<SignUp googleLogin={googleLogin} login={login} />} />
        </Routes>
    </div>

    </LocalizationProvider>
  );
}

export default App;
