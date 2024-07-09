import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Events from '../components/Events';
import { Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// LandingPage component
const LandingPage = () => {
  /* Using the useState hook to store the events data
  The initial value of events is an empty array
  The setEvents function is used to update the events data
  The useEffect hook is used to fetch the events data from the server
  The fetch function is used to make a GET request to the /api/events endpoint
  The response is converted to JSON format using the json() method
  The data is then stored in the events state using the setEvents function */

  const [eventsData, setEvents] = useState([]);

  const eventsURL = 'http://localhost:8080/events';
  useEffect(() => {
    //fetch('/api/events')
    fetch(eventsURL)
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    // Check if user is logged in - if not logged in, bring to sign up page.
    // If logged in, bring to post event page.
    // TODO - implement this properly
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