import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./MyEvents.css";

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const MyEvents = ({ profile }) => {

    const [data, setData] = useState([]);
    const [userEvents, setUserEvents] = useState([]);

    const fetchData = () => {
        return fetch('http://localhost:8080/events')
            .then((res) => res.json())
            .then((d) => {
                setData(d);
                filterUserEvents(d);
            });
    };

    const filterUserEvents = (events) => {
        const filteredEvents = events.filter(event => event.creatorEmail === profile.email);
        setUserEvents(filteredEvents);
    };

    // Fetches the data from the server 
    useEffect(() => {
        fetchData();
    }, []);

    // Placeholder function 
    function myEvents(data) {
        return data.filter((data) =>
            data
        );
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/PostEvent`;
        navigate(path);
    }

    const handleEditEvent = () => {
        //let path = "/edit/${eventId}";
        let path = `/EditEvent`;
        navigate(path);
    };

    const handleDeleteEvent = (eventId) => {
        axios.delete(`http://localhost:8080/events/${eventId}`)
            .then(() => {
                // After successful deletion, fetch the updated list of user events
                fetchData();
            })
            .catch(error => {
                console.error("There was an error deleting the event!", error);
            });
    };

    return (
        <div>
            {profile &&
                <>
                    <Box>
                        <Typography fontWeight="800" variant="h4" sx={{ m: 2 }}>{toTitleCase(profile.given_name)}'s Events: </Typography>
                        <Button className="Button" variant="contained" onClick={routeChange} sx={{ mx: 2, backgroundColor: "green" }}>
                            Post Event
                        </Button>
                    </Box>
                    <Box display="flex" alignItems={"left"}>
                        <Events eventsData={myEvents(data)} editButton={true} deleteButton={true} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} />
                    </Box>
                </>
            }
        </div >
    );
};

export default MyEvents;

/**
 * 
email
: 
"anselmpius@gmail.com"
family_name
: 
"long"  
given_name
: 
"anselm"
id
: 
"116701179252726109160"
name
: 
"anselm long"
picture
: 
"https://lh3.googleusercontent.com/a/ACg8ocKi9DT1lPnJrGkBjbJkww8nPiKJJQo5nWOZTvz8rMCEMzYqCBUVWw=s96-c"
verified_email
: 
true
 */