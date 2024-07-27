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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Cloudinary } from 'cloudinary-core';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const cloudinary = new Cloudinary({ cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, secure: true });

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
    let dateObj = Date();

    const [eventTitle, setEventTitle] = useState('');
    const [date, setDate] = useState(dayjs(dateObj));
    const [cost, setCost] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [type, setType] = useState('');
    const [registrationLink, setRegistrationLink] = useState('');
    const [organiser, setOrganiser] = useState('');
    const [location, setLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [isFree, setIsFree] = useState(true);


    const handleSubmit = async (e) => {
      
        e.preventDefault();

        if (!eventTitle || !date || !startTime || !endTime || !type || !registrationLink || !organiser || !location || !eventDescription) {
            alert('Please fill out all required fields.');
            return;
        }

        const formattedDate = date.format('dddd, DD MMMM YYYY'); // Example: Monday, 01 January 2022
        const formattedStartTime = startTime ? startTime.format('HH:mm') : ''; // Example: 14:30
        const formattedEndTime = endTime ? endTime.format('HH:mm') : ''; // Example: 15:30

        const formData = new FormData();
        let pictureUrl = '';
        if (picture) {
            formData.append('file', picture);
            formData.append('upload_preset', 'nusphere');

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/dj9cxk8jl/image/upload`, formData);
                pictureUrl = response.data.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary', error);
                alert('Failed to upload image. Please try again.');
                return;
            }

        } else {
            setPicture('');
            formData.append('file', '');
        }

        //const formData = new FormData();
        formData.append('eventTitle', eventTitle);
        formData.append('date', formattedDate);
        formData.append('cost', isFree ? '0' : cost);
        formData.append('startTime', formattedStartTime);
        formData.append('endTime', formattedEndTime);
        formData.append('type', type);
        formData.append('registrationLink', registrationLink);
        formData.append('organiser', organiser);
        formData.append('location', location);
        formData.append('eventDescription', eventDescription);
        formData.append('picture', pictureUrl);
        formData.append('userID', getUserID()); // Hardcoded user_id for now

        

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        axios.post(process.env.REACT_APP_BACKEND_URL + "/events", formData)
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
        <Box
            className="post-event"
            max-width="800px"
            margin="0 auto"
            padding="20px"
            font-family="Roboto, sans-serif"
            data-testid="post-event-form"
        >
            <Typography fontWeight="600" variant="h3">Post your event!</Typography>
            <Typography variant="h6">Please be as detailed as possible.</Typography>
            <form onSubmit={handleSubmit} data-testid="event-form">
                <Box className="title-and-type" display={'flex'} sx={{ my: 2 }} alignItems={"center"} data-testid="title-and-type">
                    <Box sx={{ mr: 2 }}>
                        <TextField
                            required
                            id="outlined-basic"
                            label="Event Title"
                            variant="outlined"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            margin="normal"
                            sx={{ width: '550px' }}
                            data-testid="event-title-input"
                        />
                    </Box>

                    <Box sx={{ mt: 1, width: "100%" }}>
                        <FormControl fullWidth >
                            <InputLabel>Event Type</InputLabel>
                            <Select
                                value={type}
                                label="Select Event Type"
                                onChange={(e) => setType(e.target.value)}
                                required
                                data-testid="event-type-select"
                            >
                                <MenuItem value={"Academic"}>Academic</MenuItem>
                                <MenuItem value={"Career"}>Career</MenuItem>
                                <MenuItem value={"Social"}>Social</MenuItem>
                                <MenuItem value={"Sports"}>Sports</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
                <Box display="flex" data-testid="is-free-switch">
                    <Typography variant="h6" display="flex">Is this event free?</Typography>
                    <Switch
                        display="flex"
                        checked={isFree}
                        onChange={handleChange}
                        defaultChecked
                        data-testid="is-free-switch-input"
                    />
                </Box>
                {!isFree &&
                    <Box data-testid="cost-input">
                        <TextField
                            required
                            id="outlined-basic"
                            label="Cost"
                            variant="outlined"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            margin="normal"
                            data-testid="cost-input"
                        />
                    </Box>
                }

                <Box display={"flex"} data-testid="image-upload">
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ my: 1 }}
                        data-testid="upload-button"
                    >
                        Upload your Event Image here
                        <VisuallyHiddenInput type="file" onChange={handleImageUpload} data-testid="image-upload-input" />
                    </Button>
                </Box>

                <Box className="datetime" display={"flex"} justifyContent={"space-between"} sx={{ mt: 2 }} data-testid="datetime-section">
                    <Box>
                        <DatePicker 
                            sx={{ width: '80%' }}
                            value={date}
                            onChange={(newDate) => setDate(newDate)}
                            margin="normal"
                            data-testid="date-picker"
                        />
                    </Box>
                    <Box>
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(newTime) => setStartTime(newTime)}
                            data-testid="start-time-picker"
                        />
                    </Box>
                    <Box sx={{ m: 2 }}>
                        <Typography variant="body1">-</Typography>
                    </Box>
                    <Box>
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(newTime) => setEndTime(newTime)}
                            data-testid="end-time-picker"
                        />
                    </Box>
                </Box>


                <Box className="bottom-three" display={"flex"} justifyContent={"space-between"} data-testid="bottom-three-section">
                    <Box>
                        <TextField
                            required
                            id="outlined-basic"
                            label="Registration Link"
                            variant="outlined"
                            value={registrationLink}
                            onChange={(e) => setRegistrationLink(e.target.value)}
                            margin="normal"
                            data-testid="registration-link-input"
                        />
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
                            data-testid="organiser-input"
                        />
                    </Box>
                    <Box>
                        <TextField
                            required
                            id="outlined-basic"
                            label="Location"
                            variant="outlined"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            margin="normal"
                            display="flex"
                            data-testid="location-input"
                        />
                    </Box>
                </Box>
                <Box data-testid="event-description-input">
                    <TextField fullWidth
                        id="outlined-multiline-flexible"
                        label="Event Description"
                        width="100%"
                        multiline
                        value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}
                        maxRows={5}
                        margin="normal"
                        data-testid="event-description-input"
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} data-testid="submit-button">Submit</Button>
            </form>
        </Box>
    );
};

export default PostEvent;
