// convert this into a component i can use 
import React from "react"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './Events.css';
import { Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Define a mapping of event types to colors
const eventTypeToColor = {
	Academic: "blue",
	Social: "orange",
	Sports: "red",
	Career: "purple",
	// Add more event types and their corresponding colors as needed
};


const Events = ({ eventsData, editButton, deleteButton, onEditEvent, onDeleteEvent }) => {
	let navigate = useNavigate();
	const [editing, setEditing] = useState(false);

	const handleEventClick = (id) => {
		navigate(`/events/${id}`);
	};

	return (
		<div className="events">
			{eventsData.map((event, index) => (
				<div>
					<div key={index} className="event-card" onClick={() => handleEventClick(event.id)}>
						<img class='img' src={'../img/' + event.imageUrl} alt={event.title} />
						{/*console.log(event.imageUrl)*/}

						<Typography variant="h5">{event.title}</Typography>

						<Typography variant="body1"
							sx={{
								overflow: 'hidden',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 3, // Adjust the number of lines to show
								lineClamp: 3,
							}}>
							{event.description}
						</Typography>

						<Box display="flex" sx={{ mt: 1 }}>
							<CalendarMonthIcon />
							<Typography variant="body1" style={{ marginLeft: 4 }}>{event.date}</Typography>
						</Box>

						<Box fontWeight="fontWeightMedium" sx={{ display: "inline-block", p: 0.5, my: 1, mr: 1, border: "2px solid gray", borderRadius: 2 }}>
							<Typography variant="body1" sx={{ color: eventTypeToColor[event.type] || "black", fontWeight: "bold" }}>
								{event.type}
							</Typography>
						</Box>

						<Box sx={{ display: "inline-block", p: 0.5, my: 1, border: "2px solid gray", borderRadius: 2 }}>
							<Typography>
								{event.price > 0 ? "$" + event.price : "Free"}
							</Typography>
						</Box>
						
					</div>
					<div className="event-buttons">
						{editButton &&
							<Button variant="contained" onClick={() => onEditEvent(event.id)} sx={{ ml: 2, mr: 1 }} size="small">
								Edit
							</Button>
						}
						{deleteButton &&
							<Button variant="outlined" onClick={() => onDeleteEvent(event.id)} sx={{ mx: 1 }} color="error" size="small" >
								Delete
							</Button>
						}
					</div>
				</div>
			))}
		</div>
	)
}

export default Events;