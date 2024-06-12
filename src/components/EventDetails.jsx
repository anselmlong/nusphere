import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/events/` + id)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event details:', error));
    }, [id]);

    console.log(event);

    //event == null -> data is still fetching
    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="event-details">
            <h1>{event.title}</h1>
            <p>Date: {event.date}</p>
            <p>Cost: {event.price}</p>
            <p>Start Time: {event.startTime}</p>
            <p>End Time: {event.endTime}</p>
            <p>Type: {event.type}</p>
            <p>Location: {event.location}</p>
            <p>Organiser: {event.organiser}</p>
            <p>Description: {event.description}</p>
            {event.imageUrl && <img src={"/img/" + event.imageUrl} alt={event.title} />}
        </div>
    );
};

export default EventDetails;