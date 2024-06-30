import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './EventDetails.css';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Define a mapping of event types to colors
const eventTypeToColor = {
    Academic: "blue",
    Social: "orange",
    Sports: "red",
    Career: "purple",
    // Add more event types and their corresponding colors as needed
};


const EventDetails = ({ editing }) => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);

    let navigate = useNavigate();

    const registerRoute = (path) => {
        console.log("Bringing to registration link. " + path)
        // navigate("/" + path, {replace : true});
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

    if (editing) {

    }
    return (
        <div className="event-details">
            <Typography fontWeight="fontWeightMedium" variant="h4" align="center">{event.title}</Typography>
            {event.imageUrl && <img src={"/img/" + event.imageUrl} alt={event.title} />}
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <CalendarMonthIcon />
                <Typography variant="body1" style={{ marginLeft: 4 }}>{event.date}</Typography>
            </Box>
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <AttachMoneyIcon />
                <Typography variant="body1" style={{ marginLeft: 4 }}>
                    {event.price === 0 ? "Free" : "$" + event.price}
                </Typography>
            </Box>
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <AccessTimeIcon />
                <Typography variant="body1" style={{ marginLeft: 4 }}>{event.startTime} - {event.endTime}</Typography>
            </Box>
            <Box fontWeight="fontWeightMedium" sx={{ display: "inline-block", p: 0.5, my: 1, mr: 1, border: "2px solid gray", borderRadius: 2, alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: eventTypeToColor[event.type] || "black", fontWeight: "bold" }}>
                    {event.type}
                </Typography>
            </Box>
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <LocationOnIcon />
                <Typography variant="body1" style={{ marginLeft: 4 }}>{event.location}</Typography>
            </Box>
            <Box display="flex" sx={{ m: 2, alignItems: "center" }}>
                <Typography variant="body1" style={{ marginLeft: 4 }}>{event.description}</Typography>
            </Box>
            <Box display="flex" sx={{ my: 2, alignItems: "center" }}>
                <AccountCircleIcon />
                <Typography variant="body1" style={{ marginLeft: 4 }}>{event.organiser}</Typography>
            </Box>
        
            <Button display="inline-block" id="postevent" variant="contained"  onClick={() => {window.location.href = event.registrationLink}} sx={{ my: 1 }} size="medium">
                Register
            </Button>
            
        </div>
    );
};

export default EventDetails;