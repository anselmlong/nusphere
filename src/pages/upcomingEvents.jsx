import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";

const UpcomingEvents = () => {

    const [data, setData] = useState([]);

    const fetchData = () => {
        return fetch('http://localhost:8080/events')
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
            <h1>
                Upcoming Events:
                <Events eventsData={upcoming(data)} />
            </h1>
        </div>
    );
};

export default UpcomingEvents;