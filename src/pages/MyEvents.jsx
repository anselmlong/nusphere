import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./MyEvents.css";
import { jwtDecode } from "jwt-decode";

const eventsURL = "/events";

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
    const token = localStorage.getItem('SavedToken');
    let userID;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userID = decodedToken.user_id;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }
    

    // Fetches the data from the server 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + eventsURL)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching events:', error));
    };

    console.log(data);

    // Filter events based on userID
    function myEvents(data) {
        return data.filter((event) => event.userID == userID);
    }

    console.log(myEvents(data));

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/PostEvent`;
        navigate(path);
    }

    const handleDeleteEvent = (eventId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`)
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
                        <Typography fontWeight="800" variant="h4" sx={{ m: 2 }}>{toTitleCase(profile.name)}'s Events: </Typography>
                        <Button className="Button" variant="contained" onClick={routeChange} sx={{ mx: 2, backgroundColor: "green" }}>
                            Post Event
                        </Button>
                    </Box>
                    <Box display="flex" alignItems={"left"}>
                        <Events eventsData={myEvents(data)} editButton={true} deleteButton={true} onDeleteEvent={handleDeleteEvent} />
                    </Box>
                </>
            }
        </div >
    );
};

export default MyEvents;