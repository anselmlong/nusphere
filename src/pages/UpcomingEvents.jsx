import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const UpcomingEvents = () => {

    const [data, setData] = useState([]);

    const fetchData = () => {
        return fetch(process.env.REACT_APP_BACKEND_URL + "/events")
            .then((res) => res.json())
            .then((d) => setData(d));
    };

    // Fetches the data from the server 
    useEffect(() => {
        fetchData();
    }, []);

    function upcoming(data) {
        return data.filter((data) =>
            data.date > new Date().toISOString()
        );
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}
        >
            <Box>
                <Typography fontWeight="800" variant="h4" sx={{ m: 2 }}>Upcoming Events: </Typography>
                <Events eventsData={upcoming(data)} />
            </Box>
        </div>
    );
};

export default UpcomingEvents;