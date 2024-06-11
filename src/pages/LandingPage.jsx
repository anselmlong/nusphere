import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Events from '../components/Events';

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

  useEffect(() => {
    //fetch('/api/events')
    fetch('http://localhost:8080/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `../PostEvent`; 
    navigate(path);
  }

  // Returns the landing page, with title text in h1, and description text in p.
  // Also includes a button to post an event. This should bring you to the log in page if you are not logged in.
  // Otherwise, will bring you to the posting page.
  return (
    <div className="landing-page">
      <header className="header">
        <h1>NUSphere</h1>
        <p>All NUS events in one place.</p>
        <button id="postevent" 
        className='bg-green-900 text-white cursor-pointer rounded' onClick={routeChange}>Post Event</button>
      </header>
    <Events eventsData={eventsData} /> 
    </div>
  );
};

export default LandingPage;
