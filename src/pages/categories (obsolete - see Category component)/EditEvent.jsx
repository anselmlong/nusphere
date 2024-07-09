import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SellIcon from "@mui/icons-material/Sell";
// Define a mapping of event types to colors
const eventTypeToColor = {
    Academic: "blue",
    Social: "orange",
    Sports: "red",
    Career: "purple",
    // Add more event types and their corresponding colors as needed
};

// OBSOLETE

const EditEvent = () => {

	// Find the specific event from the URL of the ID
	const [event, setEvent] = useState(null);
	const [searchParams] = useSearchParams();

	const id = searchParams.get('id');

	// Need these fields to update the event.
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

		axios.put(process.env.REACT_APP_BACKEND_URL + "/events/${id}", formData)
			.then(response => {
				console.log(response);
				navigate(`/MyEvents`);
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

	return (
		<div className="event-details">
		{/** Display the event title */}
		<Typography fontWeight="fontWeightMedium" variant="h4" align="center">{event.title}</Typography>

		{/** Display the event image, if available */}
		{event.imageUrl && 
		<Box display="flex" alignItems={"center"} justifyContent={"center"}>
			<img 
			src={"/img/" + event.imageUrl} alt={event.title} />
		</Box>
		}

		{/** Display the event date*/}
		<Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
			<CalendarMonthIcon />
			<Typography variant="body1" style={{ marginLeft: 4 }}>{event.date}</Typography>
		</Box>


		{/** Display the event time */}
		<Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
			<AccessTimeIcon />
			<Typography variant="body1" style={{ marginLeft: 4 }}>{event.startTime} - {event.endTime}</Typography>
		</Box>

		{/** Display the event location */}
		<Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
			<LocationOnIcon />
			<Typography variant="body1" style={{ marginLeft: 4 }}>{event.location}</Typography>
		</Box>
		
		{/** Display the event organiser */}
		<Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
			<AccountCircleIcon />
			<Typography variant="body1" style={{ marginLeft: 4 }}>{event.organiser}</Typography>
		</Box>
	
		{/** Display the event price */}
		<Box display="flex" sx={{ mt: 1, alignItems: "center" }}>
			<SellIcon />
			<Typography variant="body1" style={{ marginLeft: 4 }}>
				{event.price === 0 ? "Free!" : "$" + event.price}
			</Typography>
		</Box>

		{/** Display the event description */}
		<Box display="flex" sx={{ m: 2, alignItems: "center" }}>
			<Typography variant="body1" style={{ marginLeft: 4 }}>{event.description}</Typography>
		</Box>
		
		{/** Display the event type */}
		<Box fontWeight="fontWeightMedium" sx={{ display: "inline-block", p: 0.5, my: 1, mx: 2, border: "2px solid gray", borderRadius: 2, alignItems: "center" }}>
			<Typography variant="body1" sx={{ color: eventTypeToColor[event.type] || "black", fontWeight: "bold" }}>
				{event.type}
			</Typography>
		</Box>

		<Button fullWidth display="flex" id="postevent" variant="contained"  onClick={() => {window.location.href = event.registrationLink}} sx={{ my: 1 }} size="medium">
			Register
		</Button>
		
	</div>
	);
};

export default EditEvent;