import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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

    const fetchData = () => {
        return fetch('http://localhost:8080/events')
            .then((res) => res.json())
            .then((d) => setData(d));
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

    return (
        <div>
            <div className="events flex justify-between items-center">
                {console.log(profile)}
                <button id="postevent" className='bg-green-900 text-white cursor-pointer rounded' onClick={routeChange}>
                    Post Event
                </button>   
                {profile &&
                    <h1 className="flex-grow">
                        {toTitleCase(profile.given_name)}'s Events:
                        <Events eventsData={myEvents(data)} editButton={true} deleteButton={true} />
                    </h1>
                }
                
                
            </div>
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