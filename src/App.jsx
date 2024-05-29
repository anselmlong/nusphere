import './App.css';
import LandingPage from './components/LandingPage';
import { Navigation } from './components/Navigation';
import Avatar from '@mui/material/Avatar';
// import Navbar from "./components/Navbar";
/*
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Events from "./pages/events";
import AnnualReport from "./pages/annual";
import Teams from "./pages/team";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";
*/
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
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
      <div className='login'>
        {profile ? (
          <div>
            <Avatar alt="user image" src={profile.picture} />
            <p>{profile.name}</p>
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
      </div>
      <Navigation />
      <LandingPage />
    </div>
  );
}

export default App;
