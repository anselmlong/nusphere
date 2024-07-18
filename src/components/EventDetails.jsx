import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './EventDetails.css';
import { Button, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SellIcon from '@mui/icons-material/Sell';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { set } from 'mongoose';

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

// Define a mapping of event types to colors
const eventTypeToColor = {
    Academic: "blue",
    Social: "orange",
    Sports: "red",
    Career: "purple",
    // Add more event types and their corresponding colors as needed
};


const EventDetails = () => {
    let dateObj = Date();
    const { id } = useParams(); // Get the event ID from the URL
    const location = useLocation(); // Get the location object
    const editing = location.state?.editing || false;
    const [event, setEvent] = useState(null);
    const [titleEditing, setTitleEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [dateEditing, setDateEditing] = useState(false);
    const [date, setDate] = useState(dayjs(dateObj));
    const [newDate, setNewDate] = useState(dayjs(dateObj));
    const [imageEditing, setImageEditing] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [timeEditing, setTimeEditing] = useState(false);
    const [newStartTime, setNewStartTime] = useState(null);
    const [newEndTime, setNewEndTime] = useState(null);
    const [locationEditing, setLocationEditing] = useState(false);
    const [newLocation, setNewLocation] = useState("");
    const [organizerEditing, setOrganizerEditing] = useState(false);
    const [newOrganizer, setNewOrganizer] = useState("");
    const [descriptionEditing, setDescriptionEditing] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [registrationLinkEditing, setRegistrationLinkEditing] = useState(false);
    const [newRegistrationLink, setNewRegistrationLink] = useState("");
    const [priceEditing, setPriceEditing] = useState(false);
    const [newPrice, setNewPrice] = useState(0);
    const [typeEditing, setTypeEditing] = useState(false);
    const [newType, setNewType] = useState("");
    const [bookmarked, setBookmarked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + "/events/" + id)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event details:', error));
    }, [id]);

    const handleTitleEdit = () => {
        setTitleEditing(false);
        const updatedEvent = { ...event, title: newTitle };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handleDateEdit = () => {
        setDateEditing(false);
        const formattedDate = newDate.format('dddd, DD MMMM YYYY'); // Example: Monday, 01 January 2022
        const updatedEvent = { ...event, date: formattedDate };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleImageEdit = () => {
        setImageEditing(false);
        const updatedEvent = { ...event, picture: newImage };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handleTimeEdit = () => {
        setTimeEditing(false);
        const formattedStartTime = newStartTime ? newStartTime.format('HH:mm') : ''; // Example: 14:30
        const formattedEndTime = newEndTime ? newEndTime.format('HH:mm') : ''; // Example: 15:30
        const updatedEvent = { ...event, startTime: formattedStartTime, endTime: formattedEndTime };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handleLocationEdit = () => {
        setLocationEditing(false);
        const updatedEvent = { ...event, location: newLocation };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handleOrganizerEdit = () => {
        setOrganizerEditing(false);
        const updatedEvent = { ...event, organizer: newOrganizer };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handlePriceEdit = () => {
        setPriceEditing(false);
        const updatedEvent = { ...event, price: newPrice };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handleRegistrationLinkEdit = () => {
        setRegistrationLinkEditing(false);
        const updatedEvent = { ...event, registrationLink: newRegistrationLink };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };


    const handleDescriptionEdit = () => {
        setDescriptionEditing(false);
        const updatedEvent = { ...event, description: newDescription };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const handleTypeEdit = () => {
        setTypeEditing(false);
        const updatedEvent = { ...event, type: newType };
        setEvent(updatedEvent);
        updateDetails(updatedEvent);
    };

    const updateDetails = (updatedEvent) => {

        axios.put(process.env.REACT_APP_BACKEND_URL + "/events/" + id, updatedEvent)

            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error!', error);
                console.log(error.response.data);
            });
    };

    const handleBookmark = () => {
        // Add the event to the user's bookmarks
        axios.put(process.env.REACT_APP_BACKEND_URL + "/users/" + id, {
            bookmarked_id: id
        })
        .then(response => {
            setBookmarked(true);
            alert("Event has been bookmarked!");
        })
        .catch(error => {
            console.error('There was an error bookmarking the event!', error);
            alert("There was an error bookmarking the event! YIXHI PLS FIX");
        });
    };

    const handleAddAlert = () => {
        // Add an alert for the event. Future
        alert("Alert has been added! Placeholder.");
    };

    const exitEditing = () => {
        navigate(`/events/${id}`, { state: { editing: false } });
    }

    console.log(event);

    //event == null -> data is still fetching
    if (!event) {
        return <div></div>;
    }

    return (
        <div className="event-details">
            {/** Display the event title */}
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                {!titleEditing && <Typography fontWeight="fontWeightMedium" variant="h4" align="center">{event.title}</Typography>}
                {editing && (
                    <>
                        {!titleEditing &&
                            <IconButton onClick={() => setTitleEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        }
                        {titleEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    type="text"
                                    size='small'
                                    defaultValue={event.title}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                                <IconButton onClick={handleTitleEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>

            {/** Display the event image, if available */}
            {event.imageUrl &&
                <Box display="flex" alignItems={"center"} justifyContent={"center"}>
                    <img
                        src={"/img/" + event.imageUrl} alt={event.title} />
                </Box>
            }
            {/** TODO - Doesn't work */}
            {editing && (
                <>
                    {!imageEditing && (
                        <IconButton onClick={() => setImageEditing(true)}>
                            <EditIcon />
                        </IconButton>
                    )}
                    {imageEditing && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{ my: 1 }}
                            >
                                Upload your Event Image here
                                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                            </Button>
                            <IconButton onClick={handleImageEdit}>
                                <DoneIcon />
                            </IconButton>
                        </div>
                    )}
                </>
            )}

            {/** Display the event date*/}
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <CalendarMonthIcon />
                {!dateEditing && <Typography variant="body1" style={{ marginLeft: 4 }}>{event.date}</Typography>}
                {editing && (
                    <>
                        {!dateEditing &&
                            <IconButton onClick={() => setDateEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        }
                        {dateEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <DatePicker
                                    sx={{ width: '80%' }}
                                    value={date}
                                    onChange={(newDate) => setNewDate(newDate)}
                                    margin="normal"
                                />
                                <IconButton onClick={handleDateEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>


            {/** Display the event time */}
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <AccessTimeIcon />
                {!timeEditing && <Typography variant="body1" style={{ marginLeft: 4 }}>{event.startTime} - {event.endTime}</Typography>}
                {editing && (
                    <>
                        {!timeEditing && (
                            <IconButton onClick={() => setTimeEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {timeEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TimePicker
                                    sx={{ maxWidth: '30%', mx: 1 }}
                                    label="Start Time"
                                    value={newStartTime || dayjs(event.startTime, 'HH:mm')}
                                    onChange={(newTime) => setNewStartTime(newTime)}
                                    renderInput={(params) => <TextField {...params} sx={{ marginRight: 2 }} />}
                                />
                                <TimePicker
                                    sx={{ maxWidth: '30%', mx: 1 }}
                                    label="End Time"
                                    value={newEndTime || dayjs(event.endTime, 'HH:mm')}
                                    onChange={(newTime) => setNewEndTime(newTime)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <IconButton onClick={handleTimeEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>

            {/** Display the event location */}
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <LocationOnIcon />
                {!locationEditing && <Typography variant="body1" style={{ marginLeft: 4 }}>{event.location}</Typography>}
                {editing && (
                    <>
                        {!locationEditing && (
                            <IconButton onClick={() => setLocationEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {locationEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    type="text"
                                    size='small'
                                    defaultValue={event.location}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                />
                                <IconButton onClick={handleLocationEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>

            {/** Display the event organiser */}
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <AccountCircleIcon />
                {!organizerEditing && <Typography variant="body1" style={{ marginLeft: 4 }}>{event.organizer}</Typography>}
                {editing && (
                    <>
                        {!organizerEditing && (
                            <IconButton onClick={() => setOrganizerEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {organizerEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    type="text"
                                    size='small'
                                    defaultValue={event.organizer}
                                    onChange={(e) => setNewOrganizer(e.target.value)}
                                />
                                <IconButton onClick={handleOrganizerEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>

            {/** Display the event price */}
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                <SellIcon />
                {!priceEditing && <Typography variant="body1" style={{ marginLeft: 4 }}>{event.price === 0 || event.price === "" ? "Free!" : "$" + event.price}</Typography>}
                {editing && (
                    <>
                        {!priceEditing && (
                            <IconButton onClick={() => setPriceEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {priceEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    type="text"
                                    size='small'
                                    defaultValue={event.price}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                />
                                <IconButton onClick={handlePriceEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>

            {/** Display the event description */}
            <Box display="flex" sx={{ m: 2, alignItems: "center" }}>
                {!descriptionEditing && <Typography variant="body1" style={{ marginLeft: 4 }}>{event.description}</Typography>}
                {editing && (
                    <>
                        {!descriptionEditing && (
                            <IconButton onClick={() => setDescriptionEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {descriptionEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size='small'
                                    defaultValue={event.description}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                                <IconButton onClick={handleDescriptionEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>

            {/** Display the event type */}
            <Box display="flex" sx={{ alignItems: "center" }}>
                {!typeEditing && (
                    <Box fontWeight="fontWeightMedium" sx={{ display: "inline-block", p: 0.5, my: 1, mx: 2, border: "2px solid gray", borderRadius: 2, alignItems: "center" }}>
                        <Typography fontWeight="fontWeightMedium" variant="body1" sx={{ color: eventTypeToColor[event.type] || "black", fontWeight: "bold" }}>
                            {event.type}
                        </Typography>
                    </Box>
                )}
                {editing && (
                    <>
                        {!typeEditing && (
                            <IconButton onClick={() => setTypeEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {typeEditing && (
                            <div style={{ display: 'flex', alignItems: 'center', width: "30%" }}>
                                <FormControl fullWidth>
                                    <InputLabel>Event Type</InputLabel>
                                    <Select
                                        value={newType}
                                        label="Event Type"
                                        onChange={(e) => setNewType(e.target.value)}
                                    >
                                        <MenuItem value={"Academic"}>Academic</MenuItem>
                                        <MenuItem value={"Career"}>Career</MenuItem>
                                        <MenuItem value={"Social"}>Social</MenuItem>
                                        <MenuItem value={"Sports"}>Sports</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton onClick={handleTypeEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
            </Box>


            {/** Display the registration link */}
            <Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
                {!registrationLinkEditing &&
                    <Button fullWidth display="flex" id="postevent" variant="contained" onClick={() => { window.location.href = event.registrationLink }} sx={{ my: 1 }} size="medium">
                        Register
                    </Button>}

                {editing && (
                    <>
                        {!registrationLinkEditing && (
                            <IconButton onClick={() => setRegistrationLinkEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {registrationLinkEditing && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    type="text"
                                    size='small'
                                    defaultValue={event.registrationLink}
                                    onChange={(e) => setNewRegistrationLink(e.target.value)}
                                />
                                <IconButton onClick={handleRegistrationLinkEdit}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        )}
                    </>
                )}
                {/** Display bookmark add if not editing. */}
                {!editing && (
                    <>
                        {!bookmarked &&
                            <IconButton onClick={handleBookmark}>
                                <BookmarkAddIcon />
                            </IconButton>
                        }
                        {bookmarked &&
                            <IconButton disabled>
                                <BeenhereIcon />
                            </IconButton>
                        }
                    </>

                )}
                {!editing
                    &&
                    // Future feature - add alerts for events
                    <IconButton onClick={handleAddAlert}>
                        <AddAlertIcon />
                    </IconButton>
                }
            </Box>
            {editing && (
                <div>
                    <Button onClick={exitEditing}>Exit Edit Mode</Button>
                </div>
            )}
        </div>
    );
};

export default EventDetails;