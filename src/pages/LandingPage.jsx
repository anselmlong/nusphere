import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Events from '../components/Events';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

// LandingPage component
const LandingPage = () => {

  const [eventsData, setEvents] = useState([]);
  const eventsURL = "/events";

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + eventsURL)
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  console.log(eventsData);
   
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `../PostEvent`;
    navigate(path);
  }
  
  // Returns the landing page, with title text in h1, and description text in p.
  // Also includes a button to post an event. This should bring you to the log in page if you are not logged in.
  // Otherwise, will bring you to the posting page.
  return (
    <div className="landing-page">
      <Box display="inline-block">
        <header className="header">
          <Typography fontWeight="600" variant="h2">NUSphere</Typography>
          <Typography variant="h6">All NUS events in one place.</Typography>
          <Button variant="contained" onClick={routeChange}>Post Event!</Button> 
        </header>
      </Box>
      <Box display="flex">
        <Events eventsData={eventsData} />
      </Box>
    </div>
  );
};

export default LandingPage;

/*
The typography object comes with 13 variants by default:

h1
h2
h3
h4
h5
h6
subtitle1
subtitle2
body1
body2
button
caption
overline
*/