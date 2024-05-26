import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Navigation } from './components/Navigation';
import { jwtDecode } from "jwt-decode";

const CLIENT_ID = "752550756966-kgm3afqg199bjpi4mec0hq02tg875i97.apps.googleusercontent.com";

function App() {

  const [ user, setUser] = useState({});

  // Function to handle the response from the Google Sign-In button
  function handleCallbackResponse(response) {
    const token = response.credential;
    console.log("Encoded JWT ID token: " + token);
    var userObject = jwtDecode(token);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  
  function handleSignOut(e) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {  theme: "outline", size: "large" }
    );
    
    // Enable auto prompting for log in
    google.accounts.id.prompt();
  }, []);

  // if we have no user, show the sign in button
  // if we have user, show the log out button

  return (
    <div>
      <div id="signInDiv"></div>
      {
        // If user is logged in, show the sign out button
        // if user is logged out, show nothing
        Object.keys(user).length != 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      {
        user && 
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
      <Navigation />
      <LandingPage />
    </div>
  );
}

export default App;
