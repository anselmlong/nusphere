// convert this into a component i can use 
import React from "react"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import './Events.css';

const Events = ({ eventsData, editButton, deleteButton, onEditEvent, onDeleteEvent }) => {
	let navigate = useNavigate();
	const [ editing, setEditing ] = useState(false);

	const handleEventClick = (id) => {
		navigate(`/events/${id}`);
	};

	//const handleEdit = () => {
	//	console.log("Navigate to edit page");
	//	setEditing(true);
	//};

	//const handleDelete = () => {
	//	console.log("Delete event");
	//};

	return (
		<div className="events">
			{eventsData.map((event, index) => (
				<div>
					<div key={index} className="event-card" onClick={() => handleEventClick(event.id)}>
						<img class='img' src={'../img/' + event.imageUrl} alt={event.title} />
						{console.log(event.imageUrl)}
						<h3>{event.title}</h3>
						<p>{event.description}</p>
						<span>{event.date}</span>
						<span>{event.type}</span>
						<span>{event.price}</span>
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