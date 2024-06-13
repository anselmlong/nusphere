import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";

const MyEvents = ({ profile }) => {

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

    function myEvents(data) {
        return data.filter((data) =>
            data
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
            {profile &&
                <h1>
                    {profile.name} Events:
                    <Events eventsData={myEvents(data)} />
                </h1>
            }
        </div>
    );
};

export default MyEvents;