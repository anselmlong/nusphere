import React, { useEffect, useState } from 'react';
import './LandingPage.css';

// Events data
const events = [
  {
    title: 'NUS Beach Day',
    date: '18 June 2024',
    description: 'Feeling bored this summer? Join us at Sentosa!',
    imageUrl: '/photos/beach-day.jpg', // Assume images are stored locally
    type: 'Social',
    price: 'FREE',
  },
  {
    title: 'TikTok x SOC Career Fair',
    date: '2 July 2024',
    description: 'Come and get some jobs at TikTok!',
    imageUrl: '/photos/tiktok-career.jpg',
    type: 'Career',
    price: 'FREE',
  },
  {
    title: 'SoC Orbital Information Session',
    date: '2 July 2024',
    description: 'Want to learn more about Orbital? Come join us!',
    imageUrl: '/photos/orbital-info.jpg',
    type: 'Career',
    price: 'FREE',
  },
  {
    title: 'RunNUS',
    date: '2 July 2024',
    description: 'Run for a good cause at RunNUS!',
    imageUrl: '/photos/runnus.jpg',
    type: 'Career',
    price: 'FREE',
  },
];

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
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="landing-page">
      <header className="header">
        <h1>NUSphere</h1>
        <p>All NUS events in one place.</p>
        <button>Post Event</button>
      </header>
      <div className="events">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <img src={`${event.imageUrl}`} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <span>{event.date}</span>
            <span>{event.type}</span>
            <span>{event.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
