import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostEvent.css';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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
    const [isFree, setIsFree] = useState(true);

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
        alert('Image uploaded successfully!');
    };

    const handleChange = (event) => {
        setIsFree(event.target.checked);
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../`;
        navigate(path);
    };

    // Render the form
    return (
        <div className="post-event">
            <Typography fontWeight="600" variant="h3">Post your event!</Typography>
            <Typography variant="h6">Please be as detailed as possible.</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    id="outlined-basic"
                    label="Event Title"
                    variant="outlined"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    margin="normal" />

                <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <Box display="flex">
                    <Typography variant="h6" display="flex">Is this event free?</Typography>
                    <Switch
                        display="flex"
                        checked={isFree}
                        onChange={handleChange}
                        defaultChecked />
                    {!isFree &&
                        <TextField
                            required
                            id="outlined-basic"
                            label="Cost"
                            variant="outlined"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            margin="normal" />
                    }
                </Box>

                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{ my: 2 }}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                </Button>


                <div className="form-group">
                    <label>Start Time</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>End Time</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>

                <FormControl>
                    <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
                    <Select
                        value={type}
                        label="Select Event Type"
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <MenuItem value={"Academic"}>Academic</MenuItem>
                        <MenuItem value={"Career"}>Career</MenuItem>
                        <MenuItem value={"Social"}>Social</MenuItem>
                        <MenuItem value={"Sports"}>Sports</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                </FormControl>
                <Box>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Registration Link"
                        variant="outlined"
                        value={registrationLink}
                        onChange={(e) => setRegistrationLink(e.target.value)}
                        margin="normal" />
                </Box>
                <Box>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Organiser"
                        variant="outlined"
                        value={organiser}
                        onChange={(e) => setOrganiser(e.target.value)}
                        margin="normal"
                        width="50%"
                        sx={{ mr: 5 }} />

                    <TextField
                        required
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        margin="normal"
                        display="flex"
                    />
                </Box>

                <TextField fullWidth
                    id="outlined-multiline-flexible"
                    label="Event Description"
                    width="100%"
                    multiline
                    value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}
                    maxRows={5}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
            </form>
        </div>
    );
};

export default PostEvent;
