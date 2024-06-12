import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);

    let navigate = useNavigate(); 
    const registerRoute = (path) =>{ 
        navigate("/" + path, {replace : true});
    }

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
            {event.imageUrl && <img src={"/img/" + event.imageUrl} alt={event.title} />}
            <p>Date: {event.date}</p>
            <p>Cost: {event.price}</p>
            <p>Time: {event.startTime} - {event.endTime}</p>
            <p>Type: {event.type}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
            <p>Organised By: {event.organiser}</p>  
            <button id="postevent" 
                className='bg-green-900 text-white cursor-pointer rounded' onClick={() => {window.location.href= event.registrationLink}}>Register</button>    
        </div>
    );
};

export default EventDetails;