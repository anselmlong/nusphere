import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostEvent.css';



const PostEvent = () => {
    
    const [eventTitle, setEventTitle] = useState('');
    const [date, setDate] = useState('');
    const [cost, setCost] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [type, setType] = useState('');
    const [registrationLink, setRegistrationLink] = useState('');
    const [organiser, setOrganiser] = useState('');
    const [location, setLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [picture, setPicture] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!eventTitle || !date || !startTime || !endTime || !type || !registrationLink || !organiser || !location || !eventDescription) {
            alert('Please fill out all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('eventTitle', eventTitle);
        formData.append('date', date);
        formData.append('cost', cost);
        formData.append('startTime', startTime);
        formData.append('endTime', endTime);
        formData.append('type', type);
        formData.append('registrationLink', registrationLink);
        formData.append('organiser', organiser);
        formData.append('location', location);
        formData.append('eventDescription', eventDescription);
        formData.append('picture', picture);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        axios.post('http://localhost:8080/events', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error!', error);
                console.log(error.response.data)
            });
        routeChange();
    };

    const handleImageUpload = (e) => {
        setPicture(e.target.files[0]);
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../`;
        navigate(path);
    };

    // Render the form
    return (
        <div className="post-event">
            <h1>Post your event!</h1>
            <p>Please be as detailed as possible.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Title</label>
                    <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="e.g. Orbital Briefing" required />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Cost (if free, leave this blank)</label>
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="e.g. $10" />
                </div>
                <div className="form-group">
                    <label>Picture</label>
                    <input type="file" onChange={handleImageUpload} />
                </div>
                <div className="form-group">
                    <label>Start Time</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>End Time</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Event Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select Event Type</option>
                        <option value="Academic">Academic</option>
                        <option value="Career">Career</option>
                        <option value="Social">Social</option>
                        <option value="Sports">Sports</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Registration Link</label>
                    <input type="url" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Organiser</label>
                    <input type="text" value={organiser} onChange={(e) => setOrganiser(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Event Description</label>
                    <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Brief description of your event." required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PostEvent;
